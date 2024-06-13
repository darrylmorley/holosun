import { NextRequest } from "next/server";
import prisma from "@/lib/db/prisma";
import Link from "next/link";

import {
  getDescriptionFromId,
  getIdFromSlug,
  getMetaDescriptionFromId,
  getMetaNameFromId,
  getNameFromId,
  getSlugFromId,
} from "@/lib/utils/helpers";

import ProductCard from "@/components/product-card";
import ShopFilters from "@/components/shop-filters";

async function getItems(request) {
  const slug = request.params.slug;
  const id = getIdFromSlug(slug);

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

export async function generateMetadata(request: NextRequest) {
  const slug = request.params.slug;
  const id = getIdFromSlug(slug);
  console.log(slug, id);

  return {
    title: getMetaNameFromId(id),
    description: getMetaDescriptionFromId(id),
  };
}

export default async function Page(request: NextRequest) {
  const { items, id } = await getItems(request);
  const { sort } = request.searchParams;

  const slug = getSlugFromId(id);
  const catgeoryName = getNameFromId(id);
  const description = getDescriptionFromId(id);

  return (
    <>
      <div className="px-4 text-center flex flex-col justify-center items-center h-56 bg-secondary text-white space-y-4">
        <h1 className="text-5xl uppercase font-black">{catgeoryName}</h1>
        <p className="text-lg">{description}</p>
      </div>
      <div className="px-12 my-4 text-sm breadcrumbs">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/shop">Shop</Link>
          </li>
          <li>
            <Link href={`/shop/category/${slug}`}>{catgeoryName}</Link>
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
