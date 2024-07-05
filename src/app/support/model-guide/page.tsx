import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Holosun Model Number Guide: Understand Our Optics & Lasers Model Numbers",
  description:
    "Explore the Holosun Model Number Guide to understand the meaning behind each model's optics and lasers.",
  alternates: {
    canonical: "https://www.holosun-optics.co.uk/support/model-guide",
  },
  openGraph: {
    title: "Holosun Model Number Guide: Understand Our Optics & Lasers Model Numbers",
    description:
      "Explore the Holosun Model Number Guide to understand the meaning behind each model's optics and lasers.",
    url: "https://www.holosun-optics.co.uk/support/model-guide",
    images: [
      {
        url: "https://www.holosun-optics.co.uk/images/hero-carousel/aems-banner-1080x1350.jpg",
        width: 1080,
        height: 1350,
      },
      {
        url: "https://www.holosun-optics.co.uk/images/hero-carousel/aems-banner-1920x860.jpg",
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
    title: "Holosun Model Number Guide: Understand Our Optics & Lasers Model Numbers",
    description:
      "Explore the Holosun Model Number Guide to understand the meaning behind each model's optics and lasers.",
    images: ["https://www.holosun-optics.co.uk/images/hero-carousel/aems-banner-1080x1350.jpg"],
  },
};

export default function Page() {
  return (
    <>
      <div className="px-4 text-center flex flex-col justify-center items-center h-56 bg-secondary text-white space-y-4">
        <h1 className="text-5xl font-black uppercase">Model Number Guide</h1>
        <h2 className="text-lg text-center">Understanding HOLOSUN Model Numbers</h2>
      </div>
      <div className="px-12 lg:px-24 py-12">
        <p className="mb-8">
          Welcome to the HOLOSUN Model Number Guide! This reference page is designed to help you
          decode the nomenclature of HOLOSUN and HOLOSUN Elite products. By understanding the
          meaning behind each model&apos;s optics and laser designations, you can make informed
          decisions about which features best suit your needs. From reticle types and accessories to
          optic types and unique features like solar failsafe and titanium housing, this guide
          covers all the essential details. Whether you&apos;re a seasoned user or new to HOLOSUN
          products, this guide will provide the clarity you need to navigate our product lineup with
          confidence.
        </p>
        <h3>Optics</h3>
        <div className="mt-4 ml-4 space-y-6">
          <div>
            <h4>First Characters:</h4>
            <ul className="mt-1 list-disc ml-4">
              <li>HS = Holosun</li>
              <li>HE = Holosun Elite</li>
            </ul>
          </div>
          <div>
            <h4>
              First Digit (4 or 5): <span className="font-normal">The Reticle.</span>
            </h4>
            <ul className="mt-1 list-disc ml-4">
              <li className="mt-1">4: 2MOA Dot Only</li>
              <li>
                5: Multi-Reticle System (MRS) with a 65MOA Ring and 2MOA Dot. MRS options can
                include Dot only/Circle-Dot or Dot only/Circle only/Circle-Dot, depending on the
                model.
              </li>
            </ul>
          </div>
          <div>
            <h4>
              Second Digit (0 or 1): <span className="font-normal">Accessories</span>
            </h4>
            <ul className="mt-1 list-disc ml-4">
              <li>0: Standard Accessories (Bolt-on Mount, Bikini Lens Covers)</li>
              <li>
                1: Upgraded Accessories (e.g., QD mount, Flip-Down Lens Covers, Kill flash where
                applicable)
              </li>
            </ul>
          </div>
          <div>
            <h4>
              Third Digit: <span className="font-normal">Optic Type</span>
            </h4>
            <ul className="mt-1 list-disc ml-4">
              <li>0, 1, 6: 30mm Tube Sights</li>
              <li>3, 5: 20mm Sights</li>
              <li>Exception, 510: Pistol Optics</li>
            </ul>
          </div>
        </div>
        <div className="mt-8">
          <h3>Lasers</h3>
          <div className="mt-4 ml-4 space-y-6">
            <div>
              <h4>First Characters</h4>
              <ul className="mt-1 list-disc ml-4">
                <li>LS = LASER SIGHT</li>
                <li>LE = LASER ELITE</li>
              </ul>
            </div>
            <div>
              <h4>
                First Digit: <span className="font-normal">Component Count</span>
              </h4>
              <ul className="mt-1 list-disc ml-4">
                <li>1: 1 Laser - Select IR, Red, or Green</li>
                <li>2: 2 Lasers – IR + Select Red or Green Visible Laser</li>
                <li>3: 2 Lasers + IR Illuminator</li>
                <li>4: 2 Lasers, IR Illuminator + White Light</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <ul>
            <li>A*: Bottom-mounted battery, uses proprietary mount.</li>
            <li>B: Side mounted battery tray secured with two screws</li>
            <li>C: Solar Failsafe (adds Auto Mode and Solar Power)</li>
            <li>G**: Side mounted battery cap – toolless battery replacement</li>
            <li>GL*: G + low profile turrets (as of 2018 all models are L models by default)</li>
            <li>K: Sub-compact carry pistol optics</li>
            <li>M: 7075 Aluminum Housing, Water Resistant to 30 meters for 30 minutes</li>
            <li>O: Open Circle Reticle (example: HS407CO)</li>
            <li>R: Rotary Switch for brightness selection</li>
            <li>T: Titanium Housing</li>
          </ul>
        </div>
      </div>
    </>
  );
}
