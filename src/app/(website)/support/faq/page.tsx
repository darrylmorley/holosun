import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Holosun FAQ - Your Questions Answered",
  description:
    "Find answers to common questions about Holosun's products. Learn about features, compatibility, installation, and more. Visit our FAQ page for support and information.",
  alternates: {
    canonical: "https://www.holosun-optics.co.uk/support/faq",
  },
  openGraph: {
    title: "Holosun FAQ - Your Questions Answered",
    description:
      "Find answers to common questions about Holosun's products. Learn about features, compatibility, installation, and more. Visit our FAQ page for support and information.",
    url: "https://www.holosun-optics.co.uk/support/faq",
    images: [
      {
        url: "https://www.holosun-optics.co.uk/images/hero-carousel/aems-banner-1080x1350.webp",
        width: 1080,
        height: 1350,
      },
      {
        url: "https://www.holosun-optics.co.uk/images/hero-carousel/aems-banner-1920x860.webp",
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
    title: "Holosun FAQ - Your Questions Answered",
    description:
      "Find answers to common questions about Holosun's products. Learn about features, compatibility, installation, and more. Visit our FAQ page for support and information.",
    images: ["https://www.holosun-optics.co.uk/images/hero-carousel/aems-banner-1080x1350.webp"],
  },
};

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "My Optic Won't Turn On?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To turn on Holosun optics, simply press any button once. If the optic doesn't power on, verify the battery orientation...",
        },
      },
      {
        "@type": "Question",
        name: "Why Is My Objective Lens Angled?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A canted objective lens is an integral feature of a reflective/reflex sight's design...",
        },
      },
      {
        "@type": "Question",
        name: "My Shake Awake Isn't Working?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If you turn off the optic manually by pressing both buttons simultaneously, the shake awake feature will be disabled...",
        },
      },
      {
        "@type": "Question",
        name: "What Is Auto Mode / Manual Mode?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In Auto Mode, the optic uses light as its power source and adjusts the reticle intensity automatically based on the surrounding ambient light...",
        },
      },
      {
        "@type": "Question",
        name: "Why Does My Optic Turn Off When I Cover The Solar Cell?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "When the solar cell is covered while in Auto Mode, it blocks all light from reaching the light sensor...",
        },
      },
      {
        "@type": "Question",
        name: "Why Am I Seeing Glare?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Some glare may be present in reflective/reflex optical sights at certain angles due to the special reflective coatings on the objective lens...",
        },
      },
    ],
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="px-4 text-center flex flex-col justify-center items-center h-56 bg-secondary text-white space-y-4">
        <h1 className="text-5xl font-black uppercase">FAQ</h1>
        <p className="text-lg text-center">Your fequently asked questions answered.</p>
      </div>
      <div className="px-24 py-12 space-y-4">
        <details className="bg-base-200 p-4">
          <summary className="text-xl font-medium">My Optic Won&apos;t Turn On?</summary>
          <div className="py-2">
            <p>
              To turn on Holosun optics, simply press any button once. If the optic doesn&apos;t
              power on, verify the battery orientation. For models with a battery tray that slides
              into the optic, ensure the POSITIVE side is facing DOWN. For models with a
              side-mounted battery and cap, the POSITIVE side should be facing OUTWARD.
            </p>
          </div>
        </details>
        <details className="bg-base-200 p-4">
          <summary className="text-xl font-medium">Why Is My Objective Lens Angled?</summary>
          <div className="py-2">
            <p>
              A canted objective lens is an integral feature of a reflective/
              <Link href="/shop/category/reflex-sights">reflex sight&apos;s</Link> design. This
              canting is necessary to correctly reflect the dot or reticle back to the user&apos;s
              eye.
            </p>
          </div>
        </details>
        <details className="bg-base-200 p-4">
          <summary className="text-xl font-medium">My Shake Awake Isn&apos;t Working?</summary>
          <div className="py-2">
            <p>
              If you turn off the optic manually by pressing both buttons simultaneously, the shake
              awake feature will be disabled. To enable the shake awake function, the optic must
              remain on and enter sleep mode on its own.
            </p>
          </div>
        </details>
        <details className="bg-base-200 p-4">
          <summary className="text-xl font-medium">What Is Auto Mode / Manual Mode?</summary>
          <div className="py-2  space-y-2">
            <p>
              <span className="font-bold">Auto Mode:</span> In Auto Mode, the optic uses light as
              its power source and adjusts the reticle intensity automatically based on the
              surrounding ambient light. In bright conditions, the reticle will be bright, while in
              dim conditions, it will be dim. In darkness, the reticle will dim to a night-vision
              (NV) compatible setting, which is invisible without an NV device. Only solar models
              feature Auto Mode.
            </p>
            <p>
              <span className="font-bold">Manual Mode:</span>In Manual Mode, the optic is powered by
              a 2032 battery, and the reticle intensity can be adjusted manually using the +/-
              buttons.
            </p>
            <p>
              <span className="font-bold">Changing Modes:</span>To switch modes, hold the
              &quot;+&quot; button for about four seconds until the reticle blinks. Repeat this step
              to switch back. Note that only solar models have Auto Mode.
            </p>
          </div>
        </details>
        <details className="bg-base-200 p-4">
          <summary className="text-xl font-medium">
            Why Does My Optic Turn Off When I Cover The Solar Cell?
          </summary>
          <div className="py-2">
            <p>
              When the solar cell is covered while in Auto Mode, it blocks all light from reaching
              the light sensor. This causes the optic to reduce the reticle intensity to a
              night-vision compatible setting, which is only visible when viewed through a night
              vision device.
            </p>
          </div>
        </details>
        <details className="bg-base-200 p-4">
          <summary className="text-xl font-medium">Why Does My Dot Look Misshapen?</summary>
          <div className="py-2 space-y-2">
            <p>
              Ensure you are looking through the optic and focusing on your target, not on the dot.
              If you wear corrective lenses, make sure to have them on. You can also try reducing
              the intensity by 1-2 steps.
            </p>
            <p>
              A starburst effect or misshapen dot can be caused by astigmatism. To check this,
              rotate the uninstalled optic while viewing the dot. If the shape rotates with the
              optic, there may be an electronic or mechanical issue. If the shape does not rotate
              with the optic, it indicates how your eye perceives the reflected dot.
            </p>
          </div>
        </details>
        <details className="bg-base-200 p-4">
          <summary className="text-xl font-medium">Why Am I Seeing Glare?</summary>
          <div className="py-2">
            <p>
              Some glare may be present in reflective/reflex optical sights at certain angles due to
              the special reflective coatings on the objective lens. This glare is more noticeable
              in low light conditions and indoors with overhead or back-lighting. The glare is also
              exaggerated when the optic is handheld, as you can pan to angles not typically
              experienced during use.
            </p>
          </div>
        </details>
      </div>
    </section>
  );
}
