export const metadata = {
  title: "About Holosun Optics UK",
  description:
    "Discover the innovation and precision behind Holosun Optics UK. Learn about our mission, cutting-edge technologies, and commitment to delivering the highest quality red dot sights and tactical optics.",
  alternates: {
    canonical: "https://www.holsun-optics.co.uk/about",
  },
  openGraph: {
    title: "About Holosun Optics UK",
    description:
      "Discover the innovation and precision behind Holosun Optics UK. Learn about our mission, cutting-edge technologies, and commitment to delivering the highest quality red dot sights and tactical optics.",
    url: "https://www.holosun-optics.co.uk/about",
    siteName: "Holosun Optics UK",
    images: [
      {
        url: "https://www.holosun-optics.co.uk/images/hero-carousel/aems-banner-1080x1350.jpg", // Must be an absolute URL
        width: 1080,
        height: 1350,
      },
      {
        url: "https://www.holosun-optics.co.uk/images/hero-carousel/aems-banner-1920x860.jpg", // Must be an absolute URL
        width: 1920,
        height: 860,
        alt: "Holosun AEMS Red Dot",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Holosun Optics UK",
    description:
      "Discover the innovation and precision behind Holosun Optics UK. Learn about our mission, cutting-edge technologies, and commitment to delivering the highest quality red dot sights and tactical optics.",
    images: ["https://www.holosun-optics.co.uk/images/hero-carousel/aems-banner-1080x1350.jpg"], // Must be an absolute URL
  },
};

export default function Page() {
  return (
    <>
      <div className="px-4 text-center flex flex-col justify-center items-center h-56 bg-secondary text-white space-y-4">
        <h1 className="text-4xl lg:text-5xl uppercase font-black">About</h1>
        <p className="text-lg">
          Holosun has been delivering high quality red dot optics since 2013
        </p>
      </div>
    </>
  );
}
