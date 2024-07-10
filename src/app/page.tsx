import { Metadata } from "next";

import prisma from "@/lib/db/prisma";

import Hero from "@/components/hero";
import Categories from "@/components/categories";
import Features from "@/components/features";
import Featured from "@/components/featured";
import Parallax from "@/components/parallax";

async function getFeaturedItems() {
  return await prisma.product.findMany({
    where: {
      id: {
        in: [8359, 8346, 8350, 8349],
      },
    },
  });
}

export const metadata: Metadata = {
  title: "Holosun Optics UK - Innovative Reflex & Red Dot Sights",
  description:
    "Holosun Optics UK for advanced red dot sights, reflex sights, magnifiers and accessories. Innovative technology, rugged designs, and unparalleled performance!",
  alternates: {
    canonical: "https://www.holosun-optics.co.uk",
  },
  openGraph: {
    title: "Holosun Optics UK - Innovative Reflex & Red Dot Sights",
    description:
      "Holosun Optics UK for advanced red dot sights, reflex sights, magnifiers and accessories. Innovative technology, rugged designs, and unparalleled performance!",
    url: "https://www.holosun-optics.co.uk",
    siteName: "Holosun Optics UK",
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
    title: "Holosun Optics UK - Innovative Reflex & Red Dot Sights",
    description:
      "Holosun Optics UK for advanced red dot sights, reflex sights, magnifiers and accessories. Innovative technology, rugged designs, and unparalleled performance!",
    images: ["https://www.holosun-optics.co.uk/images/hero-carousel/aems-banner-1080x1350.webp"],
  },
};

export default async function Page() {
  const featuredItems = await getFeaturedItems();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: "https://www.holosun-optics.co.uk",
    name: "Holosun Optics UK",
    description: "Holosun Optics UK - Innovative Reflex & Red Dot Sights",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.holosun-optics.co.uk/?s={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "01527831261",
      contactType: "Customer Service",
      email: "info@holosun-optics.co.uk",
    },
    sameAs: [
      "https://www.facebook.com/holosunuk",
      "https://www.instagram.com/holosun_optics",
      "https://x.com/holosunopticsuk",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="sr-only">Holosun Optics</h1>
      {/* Hero Section */}
      <section>
        <Hero />
      </section>

      {/* Cateogries Section */}
      <section>
        <Categories />
      </section>

      <section>
        <Parallax
          imageSrc="/images/parallax/holosun_reddot_magnifier_rifle.jpg"
          text="DICOVER HIGH QUALITY RED DOT OPTICS FROM HOLOSUN®"
        />
        {/* Credit to https://www.facebook.com/instinct.tactique for image  */}
      </section>

      <section className="px-2 my-8 lg:my-24 lg:px-12">
        <Features />
      </section>

      <section>
        <Featured featuredItems={featuredItems} />
      </section>

      <div className="divider px-2 lg:px-12 lg:my-12"></div>

      {/* Features Section */}
    </>
  );
}
