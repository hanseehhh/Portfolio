'use client';
import { useEffect, useRef } from "react";

interface FBOTarget {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  attach(id: number): number;
}

interface DoubleFBO {
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  read: FBOTarget;
  write: FBOTarget;
  swap(): void;
}

interface PointerData {
  id: number;
  texcoordX: number;
  texcoordY: number;
  prevTexcoordX: number;
  prevTexcoordY: number;
  deltaX: number;
  deltaY: number;
  down: boolean;
  moved: boolean;
  color: { r: number; g: number; b: number };
}

class GLProgram {
  gl: WebGL2RenderingContext;
  program: WebGLProgram;
  uniforms: Record<string, WebGLUniformLocation>;

  constructor(gl: WebGL2RenderingContext, vs: WebGLShader, fs: WebGLShader) {
    this.gl = gl;
    this.program = gl.createProgram()!;
    gl.attachShader(this.program, vs);
    gl.attachShader(this.program, fs);
    gl.linkProgram(this.program);
    this.uniforms = {};
    const n = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < n; i++) {
      const name = gl.getActiveUniform(this.program, i)!.name;
      this.uniforms[name] = gl.getUniformLocation(this.program, name)!;
    }
  }

  bind() { this.gl.useProgram(this.program); }
}

class GLMaterial {
  gl: WebGL2RenderingContext;
  vs: WebGLShader;
  fsSrc: string;
  programs: Record<number, WebGLProgram>;
  activeProgram: WebGLProgram | null;
  uniforms: Record<string, WebGLUniformLocation>;

  constructor(gl: WebGL2RenderingContext, vs: WebGLShader, fsSrc: string) {
    this.gl = gl;
    this.vs = vs;
    this.fsSrc = fsSrc;
    this.programs = {};
    this.activeProgram = null;
    this.uniforms = {};
  }

  setKeywords(keywords: string[]) {
    const gl = this.gl;
    let hash = 0;
    keywords.forEach(k => { for (let i = 0; i < k.length; i++) { hash = (hash << 5) - hash + k.charCodeAt(i); hash |= 0; } });
    let prog = this.programs[hash];
    if (!prog) {
      const src = keywords.map(k => `#define ${k}`).join("\n") + "\n" + this.fsSrc;
      const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
      gl.shaderSource(fs, src);
      gl.compileShader(fs);
      prog = gl.createProgram()!;
      gl.attachShader(prog, this.vs);
      gl.attachShader(prog, fs);
      gl.linkProgram(prog);
      this.programs[hash] = prog;
    }
    if (prog === this.activeProgram) return;
    this.uniforms = {};
    const n = gl.getProgramParameter(prog, gl.ACTIVE_UNIFORMS);
    for (let i = 0; i < n; i++) {
      const name = gl.getActiveUniform(prog, i)!.name;
      this.uniforms[name] = gl.getUniformLocation(prog, name)!;
    }
    this.activeProgram = prog;
  }

  bind() { this.gl.useProgram(this.activeProgram); }
}

export function SplashCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;

    let isActive = true;

    const config = {
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 1440,
      DENSITY_DISSIPATION: 2,
      VELOCITY_DISSIPATION: 2,
      PRESSURE: 0.1,
      PRESSURE_ITERATIONS: 20,
      CURL: 10,
      SPLAT_RADIUS: 0.2,
      SPLAT_FORCE: 4000,
      SHADING: true,
      COLOR_UPDATE_SPEED: 30,
      RAINBOW_MODE: false,
      COLOR: "#ffffff",
    };

    const webglParams = { alpha: true, depth: false, stencil: false, antialias: false, preserveDrawingBuffer: false };
    let gl = canvas.getContext("webgl2", webglParams) as WebGL2RenderingContext;
    const isWebGL2 = !!gl;
    if (!isWebGL2) gl = (canvas.getContext("webgl", webglParams) || canvas.getContext("experimental-webgl", webglParams)) as WebGL2RenderingContext;
    if (!gl) return;

    let halfFloat: OES_texture_half_float | null = null;
    let supportLinearFiltering = false;
    if (isWebGL2) {
      gl.getExtension("EXT_color_buffer_float");
      supportLinearFiltering = !!gl.getExtension("OES_texture_float_linear");
    } else {
      halfFloat = gl.getExtension("OES_texture_half_float");
      supportLinearFiltering = !!gl.getExtension("OES_texture_half_float_linear");
    }
    if (!supportLinearFiltering) { config.DYE_RESOLUTION = 256; config.SHADING = false; }
    gl.clearColor(0, 0, 0, 1);

    const halfType = isWebGL2 ? (gl as WebGL2RenderingContext).HALF_FLOAT : halfFloat ? halfFloat.HALF_FLOAT_OES : gl.UNSIGNED_BYTE;

    function supportFmt(intf: number, fmt: number, type: number) {
      const t = gl.createTexture()!; gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texImage2D(gl.TEXTURE_2D, 0, intf, 4, 4, 0, fmt, type, null);
      const f = gl.createFramebuffer()!; gl.bindFramebuffer(gl.FRAMEBUFFER, f);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
      return gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
    }

    function bestFmt(intf: number, fmt: number, type: number): { internalFormat: number; format: number } {
      if (!supportFmt(intf, fmt, type)) {
        const g2 = gl as WebGL2RenderingContext;
        if (intf === g2.R16F)  return bestFmt(g2.RG16F,   g2.RG,   type);
        if (intf === g2.RG16F) return bestFmt(g2.RGBA16F, g2.RGBA, type);
      }
      return { internalFormat: intf, format: fmt };
    }

    let fmtRGBA: { internalFormat: number; format: number };
    let fmtRG:   { internalFormat: number; format: number };
    let fmtR:    { internalFormat: number; format: number };
    if (isWebGL2) {
      const g2 = gl as WebGL2RenderingContext;
      fmtRGBA = bestFmt(g2.RGBA16F, g2.RGBA, halfType);
      fmtRG   = bestFmt(g2.RG16F,   g2.RG,   halfType);
      fmtR    = bestFmt(g2.R16F,    g2.RED,  halfType);
    } else {
      fmtRGBA = { internalFormat: gl.RGBA, format: gl.RGBA };
      fmtRG   = { internalFormat: gl.RGBA, format: gl.RGBA };
      fmtR    = { internalFormat: gl.RGBA, format: gl.RGBA };
    }

    function vert(src: string) {
      const s = gl.createShader(gl.VERTEX_SHADER)!; gl.shaderSource(s, src); gl.compileShader(s); return s;
    }
    function frag(src: string, kw?: string[] | null) {
      const code = (kw ? kw.map(k => `#define ${k}`).join("\n") + "\n" : "") + src;
      const s = gl.createShader(gl.FRAGMENT_SHADER)!; gl.shaderSource(s, code); gl.compileShader(s); return s;
    }

    const baseVert = vert(`
      precision highp float;
      attribute vec2 aPosition;
      varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
      uniform vec2 texelSize;
      void main(){
        vUv=aPosition*0.5+0.5;
        vL=vUv-vec2(texelSize.x,0.); vR=vUv+vec2(texelSize.x,0.);
        vT=vUv+vec2(0.,texelSize.y); vB=vUv-vec2(0.,texelSize.y);
        gl_Position=vec4(aPosition,0.,1.);
      }
    `);

    const displaySrc = `
      precision highp float; precision highp sampler2D;
      varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
      uniform sampler2D uTexture; uniform vec2 texelSize;
      void main(){
        vec3 c=texture2D(uTexture,vUv).rgb;
        #ifdef SHADING
          vec3 lc=texture2D(uTexture,vL).rgb; vec3 rc=texture2D(uTexture,vR).rgb;
          vec3 tc=texture2D(uTexture,vT).rgb; vec3 bc=texture2D(uTexture,vB).rgb;
          float dx=length(rc)-length(lc); float dy=length(tc)-length(bc);
          vec3 n=normalize(vec3(dx,dy,length(texelSize)));
          float diffuse=clamp(dot(n,vec3(0.,0.,1.))+0.7,0.7,1.0);
          c*=diffuse;
        #endif
        float a=max(c.r,max(c.g,c.b))*0.25;
        gl_FragColor=vec4(0.0,0.0,0.0,a);
      }
    `;

    const clearPrg    = new GLProgram(gl, baseVert, frag(`
      precision mediump float; precision mediump sampler2D;
      varying highp vec2 vUv; uniform sampler2D uTexture; uniform float value;
      void main(){ gl_FragColor=value*texture2D(uTexture,vUv); }
    `));
    const splatPrg    = new GLProgram(gl, baseVert, frag(`
      precision highp float; precision highp sampler2D;
      varying vec2 vUv; uniform sampler2D uTarget; uniform float aspectRatio;
      uniform vec3 color; uniform vec2 point; uniform float radius;
      void main(){
        vec2 p=vUv-point; p.x*=aspectRatio;
        gl_FragColor=vec4(texture2D(uTarget,vUv).xyz+exp(-dot(p,p)/radius)*color,1.);
      }
    `));
    const advPrg      = new GLProgram(gl, baseVert, frag(`
      precision highp float; precision highp sampler2D;
      varying vec2 vUv; uniform sampler2D uVelocity; uniform sampler2D uSource;
      uniform vec2 texelSize; uniform vec2 dyeTexelSize; uniform float dt; uniform float dissipation;
      vec4 bilerp(sampler2D s,vec2 uv,vec2 ts){
        vec2 st=uv/ts-0.5; vec2 i=floor(st); vec2 f=fract(st);
        return mix(mix(texture2D(s,(i+vec2(.5,.5))*ts),texture2D(s,(i+vec2(1.5,.5))*ts),f.x),
                   mix(texture2D(s,(i+vec2(.5,1.5))*ts),texture2D(s,(i+vec2(1.5,1.5))*ts),f.x),f.y);
      }
      void main(){
        #ifdef MANUAL_FILTERING
          vec2 coord=vUv-dt*bilerp(uVelocity,vUv,texelSize).xy*texelSize;
          vec4 result=bilerp(uSource,coord,dyeTexelSize);
        #else
          vec2 coord=vUv-dt*texture2D(uVelocity,vUv).xy*texelSize;
          vec4 result=texture2D(uSource,coord);
        #endif
        gl_FragColor=result/(1.0+dissipation*dt);
      }
    `, supportLinearFiltering ? null : ["MANUAL_FILTERING"]));
    const divPrg      = new GLProgram(gl, baseVert, frag(`
      precision mediump float; precision mediump sampler2D;
      varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR;
      varying highp vec2 vT; varying highp vec2 vB; uniform sampler2D uVelocity;
      void main(){
        float L=texture2D(uVelocity,vL).x,R=texture2D(uVelocity,vR).x;
        float T=texture2D(uVelocity,vT).y,B=texture2D(uVelocity,vB).y;
        vec2 C=texture2D(uVelocity,vUv).xy;
        if(vL.x<0.)L=-C.x; if(vR.x>1.)R=-C.x; if(vT.y>1.)T=-C.y; if(vB.y<0.)B=-C.y;
        gl_FragColor=vec4(0.5*(R-L+T-B),0.,0.,1.);
      }
    `));
    const curlPrg     = new GLProgram(gl, baseVert, frag(`
      precision mediump float; precision mediump sampler2D;
      varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR;
      varying highp vec2 vT; varying highp vec2 vB; uniform sampler2D uVelocity;
      void main(){
        gl_FragColor=vec4(0.5*(texture2D(uVelocity,vR).y-texture2D(uVelocity,vL).y
                              -texture2D(uVelocity,vT).x+texture2D(uVelocity,vB).x),0.,0.,1.);
      }
    `));
    const vortPrg     = new GLProgram(gl, baseVert, frag(`
      precision highp float; precision highp sampler2D;
      varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB;
      uniform sampler2D uVelocity; uniform sampler2D uCurl; uniform float curl; uniform float dt;
      void main(){
        float L=texture2D(uCurl,vL).x,R=texture2D(uCurl,vR).x;
        float T=texture2D(uCurl,vT).x,B=texture2D(uCurl,vB).x,C=texture2D(uCurl,vUv).x;
        vec2 f=0.5*vec2(abs(T)-abs(B),abs(R)-abs(L));
        f/=length(f)+0.0001; f*=curl*C; f.y*=-1.;
        vec2 vel=clamp(texture2D(uVelocity,vUv).xy+f*dt,-1000.,1000.);
        gl_FragColor=vec4(vel,0.,1.);
      }
    `));
    const presPrg     = new GLProgram(gl, baseVert, frag(`
      precision mediump float; precision mediump sampler2D;
      varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR;
      varying highp vec2 vT; varying highp vec2 vB;
      uniform sampler2D uPressure; uniform sampler2D uDivergence;
      void main(){
        float L=texture2D(uPressure,vL).x,R=texture2D(uPressure,vR).x;
        float T=texture2D(uPressure,vT).x,B=texture2D(uPressure,vB).x;
        gl_FragColor=vec4((L+R+B+T-texture2D(uDivergence,vUv).x)*0.25,0.,0.,1.);
      }
    `));
    const gradPrg     = new GLProgram(gl, baseVert, frag(`
      precision mediump float; precision mediump sampler2D;
      varying highp vec2 vUv; varying highp vec2 vL; varying highp vec2 vR;
      varying highp vec2 vT; varying highp vec2 vB;
      uniform sampler2D uPressure; uniform sampler2D uVelocity;
      void main(){
        float L=texture2D(uPressure,vL).x,R=texture2D(uPressure,vR).x;
        float T=texture2D(uPressure,vT).x,B=texture2D(uPressure,vB).x;
        gl_FragColor=vec4(texture2D(uVelocity,vUv).xy-vec2(R-L,T-B),0.,1.);
      }
    `));
    const copyPrg     = new GLProgram(gl, baseVert, frag(`
      precision mediump float; precision mediump sampler2D;
      varying highp vec2 vUv; uniform sampler2D uTexture;
      void main(){ gl_FragColor=texture2D(uTexture,vUv); }
    `));
    const displayMat  = new GLMaterial(gl, baseVert, displaySrc);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,-1,1,1,1,1,-1]), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2,0,2,3]), gl.STATIC_DRAW);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(0);

    function blit(target: FBOTarget | null, clear = false) {
      if (!target) { gl.viewport(0,0,gl.drawingBufferWidth,gl.drawingBufferHeight); gl.bindFramebuffer(gl.FRAMEBUFFER,null); }
      else { gl.viewport(0,0,target.width,target.height); gl.bindFramebuffer(gl.FRAMEBUFFER,target.fbo); }
      if (clear) { gl.clearColor(0,0,0,1); gl.clear(gl.COLOR_BUFFER_BIT); }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    }

    function mkFBO(w: number, h: number, intf: number, fmt: number, type: number, param: number): FBOTarget {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, intf, w, h, 0, fmt, type, null);
      const fbo = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0,0,w,h); gl.clear(gl.COLOR_BUFFER_BIT);
      return { texture, fbo, width: w, height: h, texelSizeX: 1/w, texelSizeY: 1/h, attach(id){ gl.activeTexture(gl.TEXTURE0+id); gl.bindTexture(gl.TEXTURE_2D, texture); return id; } };
    }

    function mkDFBO(w: number, h: number, intf: number, fmt: number, type: number, param: number): DoubleFBO {
      let a = mkFBO(w,h,intf,fmt,type,param), b = mkFBO(w,h,intf,fmt,type,param);
      return { width:w, height:h, texelSizeX:a.texelSizeX, texelSizeY:a.texelSizeY, get read(){ return a; }, set read(v){ a=v; }, get write(){ return b; }, set write(v){ b=v; }, swap(){ const t=a; a=b; b=t; } };
    }

    function resizeFBO(target: FBOTarget, w: number, h: number, intf: number, fmt: number, type: number, param: number) {
      const n = mkFBO(w,h,intf,fmt,type,param);
      copyPrg.bind(); gl.uniform1i(copyPrg.uniforms["uTexture"], target.attach(0)); blit(n);
      return n;
    }

    function resizeDFBO(target: DoubleFBO, w: number, h: number, intf: number, fmt: number, type: number, param: number) {
      if (target.width===w && target.height===h) return target;
      target.read = resizeFBO(target.read,w,h,intf,fmt,type,param);
      target.write = mkFBO(w,h,intf,fmt,type,param);
      target.width=w; target.height=h; target.texelSizeX=1/w; target.texelSizeY=1/h;
      return target;
    }

    function getRes(res: number) {
      let ar = gl.drawingBufferWidth/gl.drawingBufferHeight;
      if (ar<1) ar=1/ar;
      const min=Math.round(res), max=Math.round(res*ar);
      return gl.drawingBufferWidth>gl.drawingBufferHeight ? { width:max, height:min } : { width:min, height:max };
    }

    let dye: DoubleFBO, velocity: DoubleFBO, divergence: FBOTarget, curlFBO: FBOTarget, pressure: DoubleFBO;

    function initFBOs() {
      const sr=getRes(config.SIM_RESOLUTION), dr=getRes(config.DYE_RESOLUTION);
      const fp=supportLinearFiltering?gl.LINEAR:gl.NEAREST;
      gl.disable(gl.BLEND);
      if (!dye)      dye      = mkDFBO(dr.width,dr.height,fmtRGBA.internalFormat,fmtRGBA.format,halfType,fp);
      else           dye      = resizeDFBO(dye,dr.width,dr.height,fmtRGBA.internalFormat,fmtRGBA.format,halfType,fp);
      if (!velocity) velocity = mkDFBO(sr.width,sr.height,fmtRG.internalFormat,fmtRG.format,halfType,fp);
      else           velocity = resizeDFBO(velocity,sr.width,sr.height,fmtRG.internalFormat,fmtRG.format,halfType,fp);
      divergence = mkFBO(sr.width,sr.height,fmtR.internalFormat,fmtR.format,halfType,gl.NEAREST);
      curlFBO    = mkFBO(sr.width,sr.height,fmtR.internalFormat,fmtR.format,halfType,gl.NEAREST);
      pressure   = mkDFBO(sr.width,sr.height,fmtR.internalFormat,fmtR.format,halfType,gl.NEAREST);
    }

    resizeCanvas();
    displayMat.setKeywords(config.SHADING ? ["SHADING"] : []);
    initFBOs();

    const pointers: PointerData[] = [{ id:-1, texcoordX:0, texcoordY:0, prevTexcoordX:0, prevTexcoordY:0, deltaX:0, deltaY:0, down:false, moved:false, color:{r:0,g:0,b:0} }];
    let lastTime = Date.now(), colorTimer = 0, firstMove = false;

    function hexToRGB(hex: string) {
      const v = hex.replace("#","");
      return { r: parseInt(v.slice(0,2),16)/255, g: parseInt(v.slice(2,4),16)/255, b: parseInt(v.slice(4,6),16)/255 };
    }

    function HSVtoRGB(h: number, s: number, v: number) {
      const i=Math.floor(h*6), f=h*6-i, p=v*(1-s), q=v*(1-f*s), t=v*(1-(1-f)*s);
      const cases: [number,number,number][] = [[v,t,p],[q,v,p],[p,v,t],[p,q,v],[t,p,v],[v,p,q]];
      const [r,g,b] = cases[i%6];
      return { r:r*0.15, g:g*0.15, b:b*0.15 };
    }

    function genColor() { return config.RAINBOW_MODE ? HSVtoRGB(Math.random(),1,1) : hexToRGB(config.COLOR); }

    function scaleByDPR(v: number) { return Math.floor(v*(window.devicePixelRatio||1)); }

    function resizeCanvas() {
      const w=scaleByDPR(canvas.clientWidth), h=scaleByDPR(canvas.clientHeight);
      if (canvas.width!==w||canvas.height!==h) { canvas.width=w; canvas.height=h; return true; }
      return false;
    }

    function splat(x: number, y: number, dx: number, dy: number, color: {r:number;g:number;b:number}) {
      splatPrg.bind();
      gl.uniform1i(splatPrg.uniforms["uTarget"], velocity.read.attach(0));
      gl.uniform1f(splatPrg.uniforms["aspectRatio"], canvas.width/canvas.height);
      gl.uniform2f(splatPrg.uniforms["point"], x, y);
      gl.uniform3f(splatPrg.uniforms["color"], dx, dy, 0);
      gl.uniform1f(splatPrg.uniforms["radius"], (canvas.width/canvas.height>1 ? canvas.width/canvas.height : 1) * config.SPLAT_RADIUS/100);
      blit(velocity.write); velocity.swap();
      gl.uniform1i(splatPrg.uniforms["uTarget"], dye.read.attach(0));
      gl.uniform3f(splatPrg.uniforms["color"], color.r, color.g, color.b);
      blit(dye.write); dye.swap();
    }

    function step(dt: number) {
      gl.disable(gl.BLEND);
      curlPrg.bind();
      gl.uniform2f(curlPrg.uniforms["texelSize"],velocity.texelSizeX,velocity.texelSizeY);
      gl.uniform1i(curlPrg.uniforms["uVelocity"],velocity.read.attach(0));
      blit(curlFBO);

      vortPrg.bind();
      gl.uniform2f(vortPrg.uniforms["texelSize"],velocity.texelSizeX,velocity.texelSizeY);
      gl.uniform1i(vortPrg.uniforms["uVelocity"],velocity.read.attach(0));
      gl.uniform1i(vortPrg.uniforms["uCurl"],curlFBO.attach(1));
      gl.uniform1f(vortPrg.uniforms["curl"],config.CURL);
      gl.uniform1f(vortPrg.uniforms["dt"],dt);
      blit(velocity.write); velocity.swap();

      divPrg.bind();
      gl.uniform2f(divPrg.uniforms["texelSize"],velocity.texelSizeX,velocity.texelSizeY);
      gl.uniform1i(divPrg.uniforms["uVelocity"],velocity.read.attach(0));
      blit(divergence);

      clearPrg.bind();
      gl.uniform1i(clearPrg.uniforms["uTexture"],pressure.read.attach(0));
      gl.uniform1f(clearPrg.uniforms["value"],config.PRESSURE);
      blit(pressure.write); pressure.swap();

      presPrg.bind();
      gl.uniform2f(presPrg.uniforms["texelSize"],velocity.texelSizeX,velocity.texelSizeY);
      gl.uniform1i(presPrg.uniforms["uDivergence"],divergence.attach(0));
      for(let i=0;i<config.PRESSURE_ITERATIONS;i++){
        gl.uniform1i(presPrg.uniforms["uPressure"],pressure.read.attach(1));
        blit(pressure.write); pressure.swap();
      }

      gradPrg.bind();
      gl.uniform2f(gradPrg.uniforms["texelSize"],velocity.texelSizeX,velocity.texelSizeY);
      gl.uniform1i(gradPrg.uniforms["uPressure"],pressure.read.attach(0));
      gl.uniform1i(gradPrg.uniforms["uVelocity"],velocity.read.attach(1));
      blit(velocity.write); velocity.swap();

      advPrg.bind();
      gl.uniform2f(advPrg.uniforms["texelSize"],velocity.texelSizeX,velocity.texelSizeY);
      if(!supportLinearFiltering) gl.uniform2f(advPrg.uniforms["dyeTexelSize"],velocity.texelSizeX,velocity.texelSizeY);
      const vid=velocity.read.attach(0);
      gl.uniform1i(advPrg.uniforms["uVelocity"],vid);
      gl.uniform1i(advPrg.uniforms["uSource"],vid);
      gl.uniform1f(advPrg.uniforms["dt"],dt);
      gl.uniform1f(advPrg.uniforms["dissipation"],config.VELOCITY_DISSIPATION);
      blit(velocity.write); velocity.swap();

      if(!supportLinearFiltering) gl.uniform2f(advPrg.uniforms["dyeTexelSize"],dye.texelSizeX,dye.texelSizeY);
      gl.uniform1i(advPrg.uniforms["uVelocity"],velocity.read.attach(0));
      gl.uniform1i(advPrg.uniforms["uSource"],dye.read.attach(1));
      gl.uniform1f(advPrg.uniforms["dissipation"],config.DENSITY_DISSIPATION);
      blit(dye.write); dye.swap();
    }

    function render() {
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
      gl.enable(gl.BLEND);
      displayMat.bind();
      if(config.SHADING) gl.uniform2f(displayMat.uniforms["texelSize"],1/gl.drawingBufferWidth,1/gl.drawingBufferHeight);
      gl.uniform1i(displayMat.uniforms["uTexture"],dye.read.attach(0));
      blit(null);
    }

    function loop() {
      if(!isActive) return;
      const now=Date.now(), dt=Math.min((now-lastTime)/1000,0.016666);
      lastTime=now;
      colorTimer+=dt*config.COLOR_UPDATE_SPEED;
      if(colorTimer>=1){ colorTimer=((colorTimer-0)%1)+0; pointers.forEach(p=>{ p.color=genColor(); }); }
      if(resizeCanvas()) initFBOs();
      pointers.forEach(p=>{ if(p.moved){ p.moved=false; splat(p.texcoordX,p.texcoordY,p.deltaX*config.SPLAT_FORCE,p.deltaY*config.SPLAT_FORCE,p.color); } });
      step(dt);
      render();
      animIdRef.current=requestAnimationFrame(loop);
    }

    function updateDown(p: PointerData, id: number, x: number, y: number) {
      p.id=id; p.down=true; p.moved=false;
      p.texcoordX=x/canvas.width; p.texcoordY=1-y/canvas.height;
      p.prevTexcoordX=p.texcoordX; p.prevTexcoordY=p.texcoordY;
      p.deltaX=0; p.deltaY=0; p.color=genColor();
    }

    function updateMove(p: PointerData, x: number, y: number, color: {r:number;g:number;b:number}) {
      p.prevTexcoordX=p.texcoordX; p.prevTexcoordY=p.texcoordY;
      p.texcoordX=x/canvas.width; p.texcoordY=1-y/canvas.height;
      const ar=canvas.width/canvas.height;
      p.deltaX=(p.texcoordX-p.prevTexcoordX)*(ar<1?ar:1);
      p.deltaY=(p.texcoordY-p.prevTexcoordY)/(ar>1?ar:1);
      p.moved=Math.abs(p.deltaX)>0||Math.abs(p.deltaY)>0;
      p.color=color;
    }

    const onMouseDown = (e: MouseEvent) => {
      updateDown(pointers[0],-1,scaleByDPR(e.clientX),scaleByDPR(e.clientY));
      const c=genColor(); c.r*=10; c.g*=10; c.b*=10;
      splat(pointers[0].texcoordX,pointers[0].texcoordY,10*(Math.random()-.5),30*(Math.random()-.5),c);
    };
    const onMouseMove = (e: MouseEvent) => {
      const color = firstMove ? pointers[0].color : genColor();
      firstMove=true;
      updateMove(pointers[0],scaleByDPR(e.clientX),scaleByDPR(e.clientY),color);
    };
    const onTouchStart = (e: TouchEvent) => {
      for(let i=0;i<e.targetTouches.length;i++) updateDown(pointers[0],e.targetTouches[i].identifier,scaleByDPR(e.targetTouches[i].clientX),scaleByDPR(e.targetTouches[i].clientY));
    };
    const onTouchMove = (e: TouchEvent) => {
      for(let i=0;i<e.targetTouches.length;i++) updateMove(pointers[0],scaleByDPR(e.targetTouches[i].clientX),scaleByDPR(e.targetTouches[i].clientY),pointers[0].color);
    };
    const onTouchEnd = () => { pointers[0].down=false; };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove, false);
    window.addEventListener("touchend", onTouchEnd);

    loop();

    return () => {
      isActive=false;
      if(animIdRef.current) cancelAnimationFrame(animIdRef.current);
      window.removeEventListener("mousedown",onMouseDown);
      window.removeEventListener("mousemove",onMouseMove);
      window.removeEventListener("touchstart",onTouchStart);
      window.removeEventListener("touchmove",onTouchMove);
      window.removeEventListener("touchend",onTouchEnd);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none w-full h-full">
      <canvas ref={canvasRef} className="w-screen h-screen block" />
    </div>
  );
}
