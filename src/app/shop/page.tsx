import prisma from "@/lib/db/prisma";

import ProductCard from "@/components/product-card";
import ShopFilters from "@/components/shop-filters";
import { NextRequest } from "next/server";
import Link from "next/link";

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

export default async function Page(request: NextRequest) {
  const items = await getItems();
  const { sort } = request.searchParams;

  return (
    <>
      <div className="px-4 text-center flex flex-col justify-center items-center h-56 bg-secondary text-white space-y-4">
        <h1 className="font-black uppercase">Shop</h1>
        <p className="text-center">Shop our Lasers, Magnifiers, Red Dots & Mounts</p>
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
