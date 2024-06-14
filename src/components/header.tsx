{
  /* eslint-disable @next/next/no-img-element */
}
import { MenuIcon, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import CartDrawer from "./cart-drawer";
import MenuDrawer from "./menu-drawer";
import SearchDrawer from "./search-drawer";

export default function Header({ featuredItems }) {
  return (
    <header className="h-16 p-4 shadow-sm">
      <div className="flex items-center">
        <div className="w-1/4 flex justify-start pl-2">
          <button className="z-20">
            <label htmlFor="menu-drawer">
              <MenuIcon className="cursor-pointer" />
            </label>
          </button>
        </div>
        <div className="w-2/4 flex justify-center">
          <Link
            href="/"
            className="mobile-header_logo"
          >
            <img
              src="/holosun-logo.webp"
              alt="Logo"
              className="h-7"
            />
          </Link>
        </div>
        <div className="w-1/4 pr-2">
          <div className="w-full space-x-3 flex justify-end">
            <button>
              <label htmlFor="search-drawer">
                <Search
                  size={22}
                  className="cursor-pointer"
                />
              </label>
            </button>
            <button>
              <label htmlFor="cart-drawer">
                <ShoppingBag
                  size={22}
                  className="cursor-pointer"
                />
              </label>
            </button>
          </div>
        </div>
      </div>

      <MenuDrawer />

      <CartDrawer />

      <SearchDrawer featuredItems={featuredItems} />
    </header>
  );
}
