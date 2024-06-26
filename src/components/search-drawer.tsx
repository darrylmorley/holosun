import SearchDrawerFeatured from "./search-drawer-featured";
import CategoryLinks from "./category-links";
import SearchForm from "./search-form";

export default function SearchDrawer({ featuredItems }) {
  return (
    <div className="drawer drawer-end z-30">
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
          <SearchForm />
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
