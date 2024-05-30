import prisma from "@/lib/db/prisma";
import { NextRequest } from "next/server";

import { getDescriptionFromId, getIdFromSlug, getNameFromId } from "@/lib/helpers";

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
          equals: id
        }
      }
    }
  })

  return { items, id }
}

export default async function Page(request: NextRequest) {
  const { items, id } = await getItems(request);

  return (
    <>
      <div className="flex flex-col justify-center items-center h-56 bg-gray-100 space-y-4">
        <h1>{getNameFromId(id)}</h1>
        <p className="text-center">{getDescriptionFromId(id)}</p>
      </div>
      <div>
        <div className="px-4 xl:px-12 h-48 flex items-center justify-between">
          <ShopFilters />
        </div>
        <div className="flex justify-center xl:px-8">
          <div className="px-4 mb-12 grid grid-cols-2 gap-4 xl:grid-cols-4 xl:gap-8">
            {items.map((item) => {
              return (
                <ProductCard key={item.id} item={item} />
              )
            })}
          </div>
        </div>
      </div>
    </>
  );
}