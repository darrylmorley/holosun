"use client";
import { useRouter, usePathname } from "next/navigation";

export default function SearchFilters({ query }) {
  const router = useRouter();
  const pathName = usePathname();

  const handleCategorySelect = (e) => {
    const value = e.target.value;
    router.push(value);
  };

  const handleFilterSelect = (e) => {
    const value = e.target.value;
    router.push(value);
  };

  return (
    <div>
      <select
        name="sort"
        id="sort"
        defaultValue="sort"
        className="border-stone-300 focus:border-stone-300 focus:ring-stone-300"
        onChange={(e) => handleFilterSelect(e)}
      >
        <option
          value="sort"
          disabled
        >
          Sort
        </option>
        <option value={`${pathName}?query=${query}&sort=price`}>Price</option>
        <option value={`${pathName}?query=${query}&sort=name`}>Name</option>
      </select>
    </div>
  );
}
