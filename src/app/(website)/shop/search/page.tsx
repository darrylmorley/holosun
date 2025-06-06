import prisma from "@/lib/db/prisma";
import Link from "next/link";

import SearchFilters from "@/components/search-filters";
import ProductCard from "@/components/product-card";

export const metadata = {
  title: "Search Results",
  description: "Your search results for Holosun products",
};

async function getSearchItems(query: string) {
  return prisma.product.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              shortDescription: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
        {
          Manufacturer: {
            path: ["name"],
            equals: "HOLOSUN",
          },
        },
      ],
    },
  });
}

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const { query, sort } = params;
  const items = await getSearchItems(query);

  return (
    <>
      <div className="px-4 text-center flex flex-col justify-center items-center h-56 bg-secondary text-white space-y-4">
        <h1 className="text-4xl lg:text-5xl font-black uppercase">Your Search Results</h1>
        <p className="text-lg text-center">
          Your search has {items.length} results for the term{" "}
          <span className="underline font-bold">{query}</span>
        </p>
      </div>
      <div className="px-4 lg:pl-12 my-4 text-sm breadcrumbs">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/shop">Shop</Link>
          </li>
        </ul>
      </div>
      <div>
        <div className="px-4 xl:px-12 my-6 flex items-center justify-between">
          <SearchFilters query={query} />
        </div>
        <div className="flex justify-center xl:px-8">
          <div className="px-4 mb-12 grid grid-cols-2 gap-4 xl:grid-cols-4 xl:gap-8 w-full">
            {items &&
              items
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
      {!items.length && <div className="text-center text-xl">No results found</div>}
    </>
  );
}
