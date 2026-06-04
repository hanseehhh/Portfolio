import Image from "next/image";

const HELVETICA = "Helvetica, 'Helvetica Neue', Arial, sans-serif";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="overflow-hidden">
      <div className="px-6 pt-6 pb-1">
        <p
          className="text-center text-xs text-zinc-400"
          style={{ fontFamily: HELVETICA }}
        >
          © {year} Hans Thobie Sachio. All rights reserved.
        </p>
      </div>

      <div className="relative overflow-hidden h-[32vh]">
        <Image
          src="/icon/logo_black.png"
          alt="Hans"
          width={1920}
          height={480}
          className="w-full h-auto"
          priority={false}
        />
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-b from-transparent to-white" />
      </div>
    </footer>
  );
}
