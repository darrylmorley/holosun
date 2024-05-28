{/* eslint-disable @next/next/no-img-element */ }
import { MenuIcon, Search, ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="mobile-header h-16 p-4">
      <div className="mobile-header_container flex items-center">
        <div className="mobile-header_left w-1/4 flex justify-start">
          <button className="mobile-header_menu z-20">
            <label htmlFor="menu-drawer">
              <MenuIcon className="cursor-pointer" />
            </label>
          </button>
        </div>
        <div className="mobile-header_center w-2/4 flex justify-center">
          <Link href="/" className="mobile-header_logo">
            <img src="/holosun-logo.webp" alt="Logo" className="h-7" />
          </Link>
        </div>
        <div className="mobile-header_right w-1/4 ">
          <div className="w-full space-x-2 flex justify-end">
            <button className="mobile-header_search">
              <label htmlFor="search-drawer">
                <Search size={22} className="cursor-pointer" />
              </label>
            </button>
            <button className="mobile-header_cart">
              <label htmlFor="cart-drawer">
                <ShoppingBag size={22} className="cursor-pointer" />
              </label>
            </button>
          </div>
        </div>
      </div>

      {/* Menu Drawer */}
      <div className="drawer z-10">
        <input id="menu-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label htmlFor="menu-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu px-4 py-20 w-80 min-h-full bg-white text-base-content">
            <li className="py-3 border-b">Home</li>
            <li className="py-3 border-b">Shop</li>
            <li className="py-3 border-b">Blog</li>
            <li className="py-3 border-b">About</li>
            <div className="mt-12">
              <p className="font-bold underline">Need help?</p>
              <p className="mt-3">Email: <a href="mailto:info@holosun-optics.co.uk" className="font-bold">info@holosun-optics.co.uk</a></p>
              <p className="mt-1">Phone: <a href="tel:+441234567890" className="font-bold">01527831261</a></p>
            </div>
          </ul>
        </div>
      </div>

      {/* Cart Drawer */}
      <div className="drawer drawer-end z-10">
        <input id="cart-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label htmlFor="cart-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu min-h-full w-80 bg-white p-4 text-base-content text-center">
            <h4>Shopping Cart</h4>
            <div className="divider"></div>
            <h4 className="mt-4">Your cart is empty</h4>
            <li className="mt-8">Head over to the shop page to browse our products</li>
            <button className="btn btn-secondary mt-8">Shop</button>
          </ul>
        </div>
      </div>

      {/* Search Drawer */}
      <div className="drawer drawer-end z-10">
        <input id="search-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side">
          <label htmlFor="search-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu min-h-full py-8 w-80 bg-white p-4 text-base-content">
            <h4>Search our items</h4>
            <label className="mt-2 input input-bordered flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
              <input type="text" className="grow ml-2" placeholder="Search" />
            </label>
            <div className="divider"></div>
            <div>
              <h4>Quick Links</h4>
              <ul className="mt-4 space-y-2">
                <li>Magnifiers</li>
                <li>Mounts & Rails</li>
                <li>Red Dots</li>
                <li>Lasers</li>
              </ul>
            </div>
            <div className="mt-8">
              <h4>Need some insipration?</h4>
              <ul className="mt-4 space-y-2">
                <li>Product Card</li>
                <li>Product Card</li>
                <li>Product Card</li>
                <li>Product Card</li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </header >
  );
}