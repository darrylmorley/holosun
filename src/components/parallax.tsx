export default function Parallax({ imageSrc, text }) {
  return (
    <div className="relative overflow-hidden h-[70dvh]">
      <div
        className="absolute -top-0 left-0 w-full h-full bg-center bg-fixed bg-no-repeat"
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
        }}
      />
      <div className="relative z-10 flex items-center justify-center h-full w-full bg-black bg-opacity-50">
        <h2 className="px-8 lg:px-28 text-3xl lg:text-4xl font-black text-white">{text}</h2>
      </div>
    </div>
  );
}
