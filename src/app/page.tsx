import Categories from "@/components/categories";
import HeroCarousel from "@/components/hero-carousel";
import Features from "@/components/features";
import Featured from "@/components/featured";
import prisma from "@/lib/db/prisma";
import Parallax from "@/components/parallax";

async function getFeaturedItems() {
  return await prisma.product.findMany({
    where: {
      id: {
        in: [8359, 8346, 8350, 8349],
      },
    },
  });
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
      <section>
        <Categories />
      </section>

      <section>
        <Parallax
          imageSrc="/images/parallax/holosun_reddot_magnifier_rifle.png"
          text="DICOVER HIGH QUALITY RED DOT OPTICS FROM HOLOSUN®"
        />
        {/* Credit to https://www.facebook.com/instinct.tactique for image  */}
      </section>

      <section className="px-2 my-8 lg:my-24 lg:px-12">
        <Features />
      </section>

      <section>
        <Featured featuredItems={featuredItems} />
      </section>

      <div className="divider px-2 lg:px-12 lg:my-12"></div>

      {/* Features Section */}
    </>
  );
}
