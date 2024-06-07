"use client";
import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import CartDrawerProducts from "./cart-drawer-products";
import { getFormattedPrice } from "@/lib/helpers";

export default function CartDrawer() {
  const [products, setProducts] = useState([]);
  const { items, removeItem, isEmpty, updateItemQuantity, cartTotal } = useCart();

  useEffect(() => {
    setProducts(items);
  }, [items]);

  useEffect(() => {
    console.log(items);
  }, [items]);

  return (
    <div className="drawer drawer-end z-10">
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
        {isEmpty || !products.length ? (
          <ul className="menu min-h-full w-96 bg-white p-4 text-base-content text-center">
            <h4>Shopping Cart</h4>
            <div className="divider"></div>
            <h4 className="mt-4">Your cart is empty</h4>
            <li className="mt-8">Head over to the shop page to browse our products</li>
            <button className="btn btn-accent text-white mt-8">Shop</button>
          </ul>
        ) : (
          <ul
            className="w-96 min-h-full flex flex-col bg-white p-4 text-base-content lg:drawer-open"
            suppressHydrationWarning
          >
            <h4 className="text-xl text-gray-800 text-center">Shopping Cart</h4>
            <div className="divider" />
            <CartDrawerProducts
              products={products}
              updateItemQuantity={updateItemQuantity}
              removeItem={removeItem}
            />
            <div className="bg-stone-100 absolute flex flex-col bottom-0 left-0 right-0">
              <div className="mt-4 px-4 flex justify-between">
                <p className="text-center text-xl items">Subtotal</p>
                <span>{getFormattedPrice(cartTotal)}</span>
              </div>
              <div className="px-4">
                <p className="text-xs mt-2">Shipping calculated at checkout</p>
              </div>
              <div className="divider px-4" />
              <div className="p-4 mb-4 grid grid-cols-2 gap-2">
                <button className="btn btn-outline bg-white">View Cart</button>
                <button className="btn btn-accent text-white">Checkout</button>
              </div>
            </div>
          </ul>
        )}
      </div>
    </div>
  );
}
