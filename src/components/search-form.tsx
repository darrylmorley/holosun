"use client";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/navigation";
import { toggleDrawer } from "@/lib/utils/helpers";

export default function SearchForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const [text] = useDebounce(searchTerm, 200);
  const router = useRouter();

  function handleSearchClick(e, text) {
    // Handle search click
    e.preventDefault();
    toggleDrawer("search-drawer");
    router.push(`/shop/search?query=${text}`);
  }

  return (
    <form className="join w-full">
      <input
        id="search"
        type="text"
        name="search"
        value={searchTerm}
        className="input input-bordered item-join w-full"
        placeholder="Search"
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSearchClick(e, text);
        }}
      />
      <button
        className="btn btn-secondary hover:btn-accent hover:text-white item-join text-white"
        onClick={(e) => handleSearchClick(e, text)}
        data-umami-event="search-form"
        type="button"
        title="Search"
      >
        Search
      </button>
    </form>
  );
}
