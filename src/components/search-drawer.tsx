import Image from "next/image";
import Link from "next/link";

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
        <ul className="menu min-h-full py-8 w-80 bg-white p-4 text-base-content">
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
              className="grow ml-2"
              placeholder="Search"
            />
          </label>
          <div className="divider"></div>
          <div>
            <h4 className="text-lg">Quick Links</h4>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="/shop/category/magnifiers"
                  className="hover:bg-accent hover:text-white"
                >
                  Magnifiers
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/category/mounts-and-rails"
                  className="hover:bg-accent hover:text-white"
                >
                  Mounts & Rails
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/category/red-dots"
                  className="hover:bg-accent hover:text-white"
                >
                  Red Dots
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/category/lasers"
                  className="hover:bg-accent hover:text-white"
                >
                  Lasers
                </Link>
              </li>
            </ul>
          </div>
          <div className="mt-8">
            <h4 className="text-lg">Need some insipration?</h4>
            <ul className="mt-2 flex flex-col">
              {featuredItems.map((item) => {
                const image = item.Images.Image[0]
                  ? `${item.Images.Image[0].baseImageURL}/w_70/${item.Images.Image[0].publicID}.webp`
                  : `${item.Images.Image.baseImageURL}/w_70/${item.Images.Image.publicID}.webp`;

                return (
                  <li
                    key={item.id}
                    className="flex border-b border-gray-300"
                  >
                    <div className="flex">
                      <div className="p-2 bg-gray-200 min-w-20 h-20 flex justify-center items-center">
                        <Image
                          src={image}
                          alt={item.name}
                          width={100}
                          height={100}
                        />
                      </div>
                      <h3 className="text-xs self-start">{item.name}</h3>
                      <span className="text-xs self-start">
                        {Intl.NumberFormat("gb", { style: "currency", currency: "GBP" }).format(
                          item.price
                        )}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </ul>
      </div>
    </div>
  );
}
