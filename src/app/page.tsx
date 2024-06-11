import Categories from "@/components/categories";
import HeroCarousel from "@/components/hero-carousel";
import Features from "@/components/features";
import Parallax from "@/components/parallax";

export default async function Page() {
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

      <div>
        <Parallax
          imageSrc={"/images/parallax/Holosun-AEMS-Spikes-AR.webp"}
          altText={"Discover High Quality Red dot Optics from HOLOSUN® Classic & Elite."}
        />
        <section className="px-2 my-8 lg:my-12 lg:px-12">
          <Features />
        </section>
      </div>

      <div className="divider px-2 lg:px-12 lg:my-12"></div>

      {/* Features Section */}
    </>
  );
}
