import prisma from "@/lib/db/prisma";
import { Metadata } from "next";
import Link from "next/link";

import ProductCard from "@/components/product-card";
import ShopFilters from "@/components/shop-filters";

type PageProps = {
  searchParams: {
    sort: string;
  };
};

async function getItems() {
  return await prisma.product.findMany({
    where: {
      Manufacturer: {
        path: ["name"],
        equals: "HOLOSUN",
      },
    },
  });
}

export const metadata: Metadata = {
  title: "Holosun Tactical Optics & Accessories: Holosun Optics UK",
  description:
    "Explore the full range of Holosun's high-quality tactical optics. From red dot and reflex sights to aiming lasers and mounts.",
  alternates: {
    canonical: "https://www.holosun-optics.co.uk/shop",
  },
  openGraph: {
    title: "Tactical Optics & Accessories: Holosun Optics UK",
    description:
      "Explore the full range of Holosun's high-quality tactical optics. From red dot and reflex sights to aiming lasers and mounts.",
    url: "https://www.holosun-optics.co.uk/shop",
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
    title: "Tactical Optics & Accessories: Holosun Optics UK",
    description:
      "Explore the full range of Holosun's high-quality tactical optics. From red dot and reflex sights to aiming lasers and mounts.",
    images: ["https://www.holosun-optics.co.uk/images/hero-carousel/aems-banner-1080x1350.jpg"], // Must be an absolute URL
  },
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const { sort } = params;

  const items = await getItems();

  return (
    <>
      <div className="px-4 text-center flex flex-col justify-center items-center h-56 bg-secondary text-white space-y-4">
        <h1 className="text-4xl lg:text-5xl font-black uppercase">Shop Holosun Optics</h1>
        <p className="text-lg text-center">
          Explore the full range of Holosun&apos;s high-quality tactical optics and accessories.
        </p>
      </div>
      <div>
        <div className="px-12 my-4 text-sm breadcrumbs">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/shop">Shop</Link>
            </li>
          </ul>
        </div>
        <div className="px-4 xl:px-12 my-6 flex items-center justify-between">
          <ShopFilters />
        </div>
        <div className="flex justify-center xl:px-8">
          <div className="px-4 mb-12 grid grid-cols-2 gap-4 xl:grid-cols-4 xl:gap-8">
            {items
              .filter(item => item.Images && (
                (Array.isArray(item.Images.Image) && item.Images.Image.length > 0) ||
                (!Array.isArray(item.Images.Image) && item.Images.Image)
              ))
              .sort((a, b) => {
                if (sort === "price") return a.price > b.price ? 1 : -1;
                if (sort === "name") return a.name > b.name ? 1 : -1;
                return 0;
              })
              .map((item, index) => (
                <ProductCard
                  key={item.id}
                  item={item}
                  index={index}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
