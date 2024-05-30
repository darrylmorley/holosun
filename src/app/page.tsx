import prisma from "@/lib/db/prisma";

import Categories from "./components/categories";
import HeroCarousel from "./components/hero-carousel";
import Featured from "./components/featured";
import Features from "./components/features";

async function getFeaturedItems() {
  const featuredItems = await prisma.product.findMany({
    take: 4,
    where: {
      AND: {
        Manufacturer: {
          path: ["name"],
          equals: "HOLOSUN",
        },
        Category: {
          path: ["name"],
          equals: "RED DOT & HOLO POINT",
        }
      }
    }
  })

  return featuredItems;
}

export default async function Page() {
  const featuredItems = await getFeaturedItems();

  return (
    <>
      {/* Hero Section */}
      <section>
        <HeroCarousel />
      </section>

      {/* Cateogries Section */}
      <section className="px-2 flex flex-col items-center my-8 lg:my-12 lg:px-12">
        <h2 className="text-center text-2xl lg:text-3xl mb-8">Shop by Category</h2>
        <Categories />
      </section>

      {/* Featured Items Section */}
      <section className="px-2 my-8 lg:my-12 lg:px-12">
        <h2 className="text-center text-2xl lg:text-3xl mb-8">Featured Items</h2>
        <Featured featuredItems={featuredItems} />
      </section>

      <div className="divider px-2 lg:px-12 lg:my-12"></div>

      {/* Features Section */}
      <section className="px-2 my-8 lg:my-12 lg:px-12">
        <Features />
      </section>
    </>
  );
}