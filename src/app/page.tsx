import prisma from "@/lib/db/prisma";

import CategoriesDesktop from "./components/categories-desktop";
import CategoryCarousel from "./components/category-carousel";
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

      <div className="divider md:hidden"></div>

      {/* Cateogries Section */}
      <section className="py-2 px-4 space-y-4 md:hidden">
        <h2 className="md:mt-8 text-center">Shop by Category</h2>
        <CategoryCarousel />
      </section>
      <section className="hidden md:mt-16 md:px-24 md:block">
        <h2 className="text-center">Shop by Category</h2>
        <div className="pt-8">
          <CategoriesDesktop />
        </div>
      </section>

      <div className="divider px-2 md:hidden"></div>

      {/* Featured Items Section */}
      <section className="md:mt-12 md:px-24">
        <h2 className="text-center">Featured Items</h2>
        <div className="pt-8">
          <Featured featuredItems={featuredItems} />
        </div>
      </section>

      <div className="divider px-2 md:mt-24 md:px-28"></div>

      {/* Features Section */}
      <section className="md:mt-24 md:mb-24 md:px-24">
        <Features />
      </section>

      {/* <div className="divider px-2 md:mt-24 md:px-28"></div> */}
    </>
  );
}