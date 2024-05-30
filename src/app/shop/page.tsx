import prisma from "@/lib/db/prisma";

import ProductCard from "@/components/product-card";

async function getItems() {
  return await prisma.product.findMany({
    where: {
      Manufacturer: {
        path: ["name"],
        equals: "HOLOSUN",
      }
    }
  })
}

export default async function Page() {
  const items = await getItems();

  return (
    <>
      <div className="flex flex-col justify-center items-center h-56 bg-gray-100 space-y-4">
        <h1>Shop</h1>
        <p className="text-center">Shop our range of Lasers, Magnifiers, Red Dots & Mounts</p>
      </div>
      <div>
        <div className="px-4 xl:px-12 h-48 flex items-center justify-between">
          <div>
            <select name="category" id="category" className="border-stone-100 focus:border-stone-300 focus:ring-stone-300">
              <option value="category" disabled selected>Category</option>
              <option value="lasers">Lasers</option>
              <option value="magnifiers">Magnifiers</option>
              <option value="red-dots">Red Dots</option>
              <option value="mounts">Mounts</option>
            </select>
          </div>
          <div>
            <select name="sort" id="sort" className="border-stone-100 focus:border-stone-300 focus:ring-stone-300">
              <option value="sort" disabled selected>Sort</option>
              <option value="price">Price</option>
              <option value="name">Name</option>
            </select>
          </div>
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