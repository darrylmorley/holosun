import SearchDrawerFeatured from "./search-drawer-featured";
import CategoryLinks from "./category-links";

export default function SearchDrawer({ featuredItems }) {
  return (
    <div className="drawer drawer-end z-10">
      <input
        id="search-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-side">
        <label
          htmlFor="search-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="w-96 min-h-full flex flex-col bg-white p-4 text-base-content lg:drawer-open">
          <h4>Search our items</h4>
          <label className="mt-2 input input-bordered flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              id="search-box"
              type="text"
              className="grow ml-2 border-none outline-none ring-0 focus:ring-0 focus:border-0 focus:outline-none active:ring-0 active:border-0 active:outline-none"
              placeholder="Search"
            />
          </label>
          <div className="divider" />
          <div>
            <h4 className="text-lg">Quick Links</h4>
            <CategoryLinks />
          </div>
          <div className="divider" />
          <div>
            <h4 className="text-lg">Need some insipration?</h4>
            <ul className="mt-4 flex flex-col">
              {featuredItems.map((item) => (
                <SearchDrawerFeatured
                  key={item.id}
                  item={item}
                />
              ))}
            </ul>
          </div>
        </ul>
      </div>
    </div>
  );
}
