"use client";
import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import Link from "next/link";

import { getFormattedPrice, toggleDrawer } from "@/lib/utils/helpers";

import CartDrawerItems from "./cart-drawer-items";

export default function CartDrawer() {
  const [products, setProducts] = useState([]);
  const { items, removeItem, isEmpty, totalUniqueItems, updateItemQuantity, cartTotal, emptyCart } =
    useCart();

  const shipping = items.find((item) => Number(item.id) === 7476 || Number(item.id) === 8403);

  useEffect(() => {
    setProducts(items);
  }, [items, products]);

  useEffect(() => {
    if (totalUniqueItems === 1) {
      const item = items.find((item) => Number(item.id) === 7476 || Number(item.id) === 8403);
      if (item) {
        emptyCart();
      }
    }
  }, [totalUniqueItems]);

  return (
    <div className="drawer drawer-end z-30">
      <input
        id="cart-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <div className="drawer-side">
        <label
          htmlFor="cart-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {isEmpty || !items.length ? (
          <ul className="menu min-h-full w-96 bg-white p-4 text-base-content text-center">
            <h4>Shopping Cart</h4>
            <div className="divider"></div>
            <h4 className="mt-4">Your cart is empty</h4>
            <li className="mt-8">Head over to the shop page to browse our products</li>
            <Link
              href="/shop"
              passHref
              className="btn btn-accent text-white mt-8"
              onClick={() => toggleDrawer("cart-drawer")}
            >
              <button>Shop</button>
            </Link>
          </ul>
        ) : (
          <ul className="w-96 min-h-full flex flex-col bg-white p-4 text-base-content lg:drawer-open">
            <h4 className="text-xl text-gray-800 text-center">Shopping Cart</h4>
            <div className="divider" />
            <CartDrawerItems
              items={products}
              updateItemQuantity={updateItemQuantity}
              removeItem={removeItem}
            />
            <div className="bg-stone-100 absolute flex flex-col bottom-0 left-0 right-0">
              <div className="mt-4 px-4 flex justify-between">
                <p className="text-center text-xl items">Subtotal</p>
                <span>
                  {shipping
                    ? getFormattedPrice(cartTotal - shipping.price)
                    : getFormattedPrice(cartTotal)}
                </span>
              </div>
              <div className="px-4">
                <p className="text-xs mt-2">Shipping calculated at checkout</p>
              </div>
              <div className="divider px-4" />
              <div className="p-4 mb-4 grid grid-cols-2 gap-2">
                <Link
                  href="/shop/cart"
                  passHref
                  onClick={() => toggleDrawer("cart-drawer")}
                >
                  <button className="btn btn-outline bg-white w-full">View Cart</button>
                </Link>
                <Link
                  href="/shop/checkout"
                  passHref
                  onClick={() => toggleDrawer("cart-drawer")}
                >
                  <button className="btn btn-accent text-white w-full">Checkout</button>
                </Link>
              </div>
            </div>
          </ul>
        )}
      </div>
    </div>
  );
}
