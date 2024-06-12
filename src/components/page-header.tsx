export default function PageHeader({ imgSrc, heading, subHeading }) {
  return (
    <div
      className="flex flex-col justify-center items-center h-64 text-white space-y-4 bg-center"
      style={{
        backgroundImage: `url(${imgSrc})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
      }}
    >
      <div className="bg-black bg-opacity-60 w-full h-full flex flex-col items-center justify-center space-y-4">
        <h1 className="font-black uppercase">{heading}</h1>
        <p className="text-center text-xl">{subHeading}</p>
      </div>
    </div>
  );
}
