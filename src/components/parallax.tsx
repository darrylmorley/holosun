import Image from "next/image";

export default function Parallax({ imageSrc, text }) {
  return (
    <div className="relative overflow-hidden h-[70dvh]">
      <Image
        src={imageSrc}
        alt="Man aiming rifle furnished with a Holosun Red Dot"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="relative z-10 flex items-center justify-center h-full w-full bg-black bg-opacity-50">
        <h2 className="px-8 lg:px-28 text-3xl lg:text-4xl font-black text-white">{text}</h2>
      </div>
    </div>
  );
}
