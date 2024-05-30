'use client'
import { useRouter } from "next/navigation";

export default function ShopFilters() {
  const router = useRouter()

  const handleCategorySelect = (e) => {
    const value = e.target.value;
    router.push(value)
  }

  const handleFilterSelect = (e) => {
    const value = e.target.value;
    router.push(value)
  }

  return (
    <>
      <div>
        <select name="category" id="category" className="border-stone-100 focus:border-stone-300 focus:ring-stone-300" onChange={e => handleCategorySelect(e)}>
          <option value="category" disabled selected>Category</option>
          <option value="/shop/category/lasers">Lasers</option>
          <option value="/shop/category/magnifiers">Magnifiers</option>
          <option value="/shop/category/red-dot-and-holo-point">Red Dots</option>
          <option value="/shop/category/mounts-and-rails">Mounts</option>
        </select>
      </div>
      <div>
        <select name="sort" id="sort" className="border-stone-100 focus:border-stone-300 focus:ring-stone-300" onChange={e => handleFilterSelect(e)}>
          <option value="sort" disabled selected>Sort</option>
          <option value="?sort=price">Price</option>
          <option value="?sort=name">Name</option>
        </select>
      </div>
    </>
  )
}