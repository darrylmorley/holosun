import CategoryCarousel from "./components/category-carousel";
import HeroCarousel from "@/app/components/hero-carousel";

export default async function Page() {
  return (
    <>
      <section>
        <HeroCarousel />
      </section>
      <div className="divider px-2"></div>
      <section className="py-2 px-4 space-y-4">
        <h2 className="text-2xl text-center">Shop by category</h2>
        <CategoryCarousel />
      </section>
      <div className="divider px-2"></div>
      <section className="px-4">
        <h3 className="text-center">Featured Items</h3>
        <ul className="grid grid-cols-2 grid-rows-2 gap-2 mt-4">
          <li className="bg-red-500">Product 1</li>
          <li className="bg-blue-500">Product 2</li>
          <li className="bg-green-500">Product 3</li>
          <li className="bg-yellow-500">Product 4</li>
        </ul>
      </section>
      <div className="divider px-2"></div>
      <section className="py-2 px-4 space-y-4">
        <h2 className="text-2xl text-center">Why choose Holosun?</h2>
        <CategoryCarousel />
      </section>
    </>
  );
}