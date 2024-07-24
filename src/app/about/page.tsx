import Image from "next/image";

export const metadata = {
  title: "About Holosun Optics UK",
  description:
    "Discover the innovation and precision behind Holosun Optics UK. Learn about our mission, cutting-edge technologies, and commitment to delivering the highest quality red dot sights and tactical optics.",
  alternates: {
    canonical: "https://www.holosun-optics.co.uk/about",
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
          Welcome to Holosun Optics UK, your destination for cutting-edge optical technology and
          innovative reflex, holo and red dot sights.
        </h2>
      </div>
      <div className="grid lg:grid-cols-2 ">
        <div className="px-12 lg:px-24 py-8 space-y-6 col-span-1">
          <div>
            <h3>Who We Are</h3>
            <p className="mt-2">
              Welcome to Holosun Optics UK. We are dedicated to providing top-quality optical
              solutions for shooting enthusiasts, hunters, and professionals. Our extensive range of
              products includes advanced red dot sights, holo sights, magnifiers, lasers, and
              accessories. All designed with cutting-edge technology to enhance your shooting
              experience.
            </p>
          </div>
          <div>
            <h3>Our Mission</h3>
            <p className="mt-2">
              Our mission is to equip you with reliable, high-performance optics that stand the test
              of time. We believe in the power of innovation and are committed to delivering
              products that incorporate the latest advancements in optical technology.
            </p>
          </div>
          <div>
            <h3>Why Choose Us</h3>
            <ul className="ml-4 mt-2 list-disc">
              <li>
                Innovative Technology: Our products feature state-of-the-art technology, ensuring
                precision, durability, and reliability.
              </li>
              <li>
                Superior Quality: Premium materials and components to deliver optics that are built
                to last.
              </li>
              <li>
                Wide Range: Whether you&apos;re a professional marksman or a hobbyist, we have the
                right optic for you.
              </li>
              <li>
                Advanced Features: Our optics are packed with advanced features like Solar Failsafe,
                Shake Awake, and Multi-Reticle System (MRS) to enhance your shooting accuracy.
              </li>
              <li>
                Exceptional Value: We offer high-quality optics at competitive prices, providing
                exceptional value.
              </li>
              <li>
                Customer Satisfaction: We prioritize our customers needs, offering great service and
                support.
              </li>
            </ul>
          </div>
          <div>
            <h3>Our Products</h3>
            <p className="mt-2">Holosun Optics UK offers a diverse range of products, including:</p>
            <ul className="ml-4 mt-2 list-disc">
              <li>
                Red Dot Sights: Designed for quick target acquisition and accuracy in various
                lighting conditions.
              </li>
              <li>
                Magnifiers: Enhance your shooting precision with our high-quality magnifiers,
                perfect for long-range engagements.
              </li>
              <li>
                Laser Aiming Devices: Improve your aim with our precise and reliable laser aiming
                solutions.
              </li>
              <li>
                Accessories: Complement your optics with our range of accessories, designed to
                provide additional functionality and convenience.
              </li>
            </ul>
          </div>
        </div>
        <div className="px-12 lg:px-24 py-8 space-y-6 col-span-1">
          <div>
            <Image
              src="/images/about/holosun-aems.jpg"
              width={750}
              height={480}
              alt="Holosun AEMS Red Dot"
            />
          </div>
          <div>
            <Image
              src="/images/about/holosun-pistol.jpg"
              width={750}
              height={480}
              alt="Holosun AEMS Red Dot"
            />
          </div>
        </div>
      </div>
    </>
  );
}
