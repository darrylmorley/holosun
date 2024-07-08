{
  /* eslint-disable @next/next/no-img-element */
}
import { MenuIcon, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import MenuDrawer from "./menu-drawer";
import SearchDrawer from "./search-drawer";
import dynamic from "next/dynamic";

const CartDrawer = dynamic(() => import("./cart-drawer"), { ssr: false });

export default function Header({ featuredItems }) {
  return (
    <header className="h-16 p-4 shadow-sm">
      <div className="flex items-center">
        <div className="w-1/4 flex justify-start pl-2">
          <button
            className="z-20"
            title="Menu"
            type="button"
          >
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
            <button
              title="Search"
              type="button"
            >
              <label htmlFor="search-drawer">
                <Search
                  size={22}
                  className="cursor-pointer"
                />
              </label>
            </button>
            <button
              title="Cart"
              type="button"
            >
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
