import { notFound } from "next/navigation";
import prisma from "@/lib/db/prisma";
import Link from "next/link";

import {
  getDescriptionFromId,
  getIdFromSlug,
  getMetaDescriptionFromId,
  getMetaNameFromId,
  getNameFromId,
} from "@/lib/utils/helpers";

import ProductCard from "@/components/product-card";
import ShopFilters from "@/components/shop-filters";

type PageProps = {
  params: {
    slug: string;
    url: string;
  };
  searchParams: {
    sort: string;
  };
};

async function getItems(slug: string) {
  const id = getIdFromSlug(slug);
  if (!id) notFound();

  const items = await prisma.product.findMany({
    where: {
      AND: {
        Manufacturer: {
          path: ["name"],
          equals: "HOLOSUN",
        },
        categoryID: {
          equals: id,
        },
      },
    },
  });

  return { items, id };
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = params;
  const id = getIdFromSlug(slug);

  return {
    title: getMetaNameFromId(id),
    description: getMetaDescriptionFromId(id),
    alternates: {
      canonical: `https://www.holosun-optics.co.uk/shop/category/${slug}`,
    },
  };
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = params;
  const { sort } = searchParams;
  const { items, id } = await getItems(slug);

  const categoryName = getNameFromId(id);
  const description = getDescriptionFromId(id);

  return (
    <>
      <div className="px-4 text-center flex flex-col justify-center items-center h-56 bg-secondary text-white space-y-4">
        <h1 className="text-4xl lg:text-5xl uppercase font-black">{categoryName}</h1>
        <h2 className="text-lg font-normal">{description}</h2>
      </div>
      <div className="px-4 lg:pl-12 my-4 text-sm breadcrumbs">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/shop">Shop</Link>
          </li>
          <li>
            <Link href={`/shop/category/${slug}`}>{categoryName}</Link>
          </li>
        </ul>
      </div>
      <div>
        <div className="px-4 xl:px-12 my-6 flex items-center justify-between">
          <ShopFilters />
        </div>
        <div className="flex justify-center xl:px-8">
          <div className="px-4 mb-12 grid grid-cols-2 gap-4 xl:grid-cols-4 xl:gap-8 w-full">
            {items
              .sort((a, b) => {
                if (sort === "price") return a.price > b.price ? 1 : -1;
                if (sort === "name") return a.name > b.name ? 1 : -1;
                return 0;
              })
              .map((item) => (
                <ProductCard
                  key={item.id}
                  item={item}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
