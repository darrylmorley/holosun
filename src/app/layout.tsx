import { Montserrat } from "next/font/google";
import NextTopLoader from "nextjs-toploader";

import PrelineScript from "@/lib/preline/preline";
import prisma from "@/lib/db/prisma";

import Header from "@/components/header";
import Footer from "@/components/footer";

import { Providers } from "./providers";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Holusun Optics",
  description: "Holsun Optics UK",
};

async function getFeaturedItems() {
  const productsCount = await prisma.product.count({
    where: {
      Manufacturer: {
        path: ["name"],
        equals: "HOLOSUN",
      },
    },
  });

  const skip = Math.floor(Math.random() * productsCount);

  return await prisma.product.findMany({
    take: 4,
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
      className={`${montserrat.variable}`}
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
        </Providers>
      </body>
      <PrelineScript />
    </html>
  );
}
