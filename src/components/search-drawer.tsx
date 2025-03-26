import SearchDrawerFeatured from "./search-drawer-featured";
import CategoryLinks from "./category-links";
import SearchForm from "./search-form";

export default function SearchDrawer({ featuredItems }) {
  const validFeaturedItems = featuredItems.filter(item =>
    item.Images && (
      (Array.isArray(item.Images.Image) && item.Images.Image.length > 0) ||
      (!Array.isArray(item.Images.Image) && item.Images.Image)
    )
  );

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
        <div className="w-96 min-h-full flex flex-col bg-white p-4 text-base-content lg:drawer-open">
          <p className="text-2xl font-bold mb-2">Search our items</p>
          <SearchForm />
          <div className="divider" />
          <div>
            <p className="text-lg font-bold">Quick Links</p>
            <CategoryLinks />
          </div>
          <div className="divider" />
          <div>
            <p className="text-lg font-bold">Need some insipration?</p>
            <ul className="mt-4 flex flex-col gap-y-4">
              {validFeaturedItems.length > 0 ? (
                validFeaturedItems.map((item) => (
                  <SearchDrawerFeatured
                    key={item.id}
                    item={item}
                  />
                ))
              ) : (
                <li>No featured items available</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
