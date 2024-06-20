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
  title: "Holusun Optics",
  description: "Holsun Optics UK",
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

  return (
    <html
      lang="en"
      className={`${archivo.variable}`}
    >
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
          <Script
            src="http://analytics.shootingsuppliesltd.co.uk/script.js"
            data-website-id="b50e3bc4-3bdb-4eb2-bf55-72a0d175c7c9"
          />
        </Providers>
      </body>
    </html>
  );
}
