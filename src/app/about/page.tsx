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
        <h1 className="text-4xl lg:text-5xl uppercase font-black">About Holosun UK</h1>
        <h2 className="text-base font-bold lg:text-lg">
          Welcome to Holosun Optics UK, your premier destination for cutting-edge optical technology
          and innovative reflex and red dot sight solutions.
        </h2>
      </div>
      <div className="px-12 lg:px-24 py-8 space-y-6">
        <div>
          <h3>Who We Are</h3>
          <p className="mt-2">
            At Holosun Optics UK, we are dedicated to providing top-quality optics that enhance
            accuracy and performance. Our passion for precision drives us to offer a wide range of
            products designed to meet the needs of hunters and sport shooters.
          </p>
        </div>
        <div>
          <h3>Our Mission</h3>
          <p className="mt-2">
            Our mission is to equip you with reliable, high-performance optics that stand the test
            of time. We believe in the power of innovation and are committed to delivering products
            that incorporate the latest advancements in optical technology.
          </p>
        </div>
        <div>
          <h3>Why Choose Us</h3>
          <ul className="ml-4 mt-2 list-disc">
            <li>
              <strong>Innovative Technology:</strong> Our products feature state-of-the-art
              technology, including solar power, multi-reticle systems, and advanced LED
              illumination.
            </li>
            <li>
              <strong>Exceptional Quality:</strong> We adhere to the highest standards of quality
              and durability, ensuring that our optics perform in the most demanding environments.
            </li>
            <li>
              <strong>Customer Focus:</strong> Your satisfaction is our priority. We offer
              unparalleled customer service and support to help you find the perfect optic for your
              needs.
            </li>
          </ul>
        </div>
        <div>
          <h3>Our Products</h3>
          <p className="mt-2">
            Holosun Optics UK offers a diverse range of products, including red dot sights,
            magnifiers, laser aiming devices, and accessories. Each product is engineered with
            precision and crafted for reliability, ensuring you have the best tools for your
            shooting experience.
          </p>
        </div>
      </div>
    </>
  );
}
