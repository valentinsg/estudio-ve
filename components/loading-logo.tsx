import Image from "next/image"

export default function LoadingLogo() {
  return (
    <div className="relative w-44 h-14">
      <Image
        src="/images/estudio-ve-logo.png"
        alt="Estudio Ve"
        fill
        className="object-contain grayscale"
      />
      <Image
        src="/images/estudio-ve-logo.png"
        alt=""
        fill
        className="object-contain absolute inset-0 animate-logo-fill"
      />
    </div>
  )
}
