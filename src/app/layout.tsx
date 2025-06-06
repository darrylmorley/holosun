import { Archivo } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";

import prisma from "@/lib/db/prisma";

import Header from "@/components/header";
import Footer from "@/components/footer";

import { Providers } from "./providers";

import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

export const metadata = {
  title: "Holusun Optics UK",
  description:
    "Holosun Optics UK for advanced red dot sights, reflex sights, and tactical red dot sights. Innovative technology, rugged designs, and unparalleled performance!",
  openGraph: {
    title: "Holosun Optics UK",
    description:
      "Holosun Optics UK for advanced red dot sights, reflex sights, and tactical red dot sights. Innovative technology, rugged designs, and unparalleled performance!",
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
    title: "Holusun Optics UK",
    description:
      "Holosun Optics UK for advanced red dot sights, reflex sights, and tactical red dot sights. Innovative technology, rugged designs, and unparalleled performance!",
    images: ["https://www.holosun-optics.co.uk/images/hero-carousel/aems-banner-1080x1350.webp"],
  },
};

async function getFeaturedItems() {
  const itemsCount = await prisma.product.count({
    where: {
      Manufacturer: {
        path: ["name"],
        equals: "HOLOSUN",
      },
    },
  });

  const skip = Math.floor(Math.random() * itemsCount);

  return await prisma.product.findMany({
    take: 3,
    skip: skip,
    where: {
      AND: {
        Manufacturer: {
          path: ["name"],
          equals: "HOLOSUN",
        },
      },
    },
  });
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const featuredItems = await getFeaturedItems();

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Holosun Optics UK",
    url: "https://www.holosun-optics.co.uk",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "01527831261",
      contactType: "Customer Service",
      email: "info@holosun-optics.co.uk",
    },
  };

  return (
    <html
      lang="en"
      className={`${archivo.variable}`}
    >
      <head>
        <Script
          src="https://analytics.shootingsuppliesltd.co.uk/js/script.tagged-events.js"
          data-domain="holosun-optics.co.uk"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="flex flex-col h-screen">
        <NextTopLoader
          height={4}
          crawlSpeed={100}
          color="#ff3131"
          showSpinner={false}
        />
        <Providers>
          <Header featuredItems={featuredItems} />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
