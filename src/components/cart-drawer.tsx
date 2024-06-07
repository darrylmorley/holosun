"use client";
import { useEffect, useState } from "react";
import { useCart } from "react-use-cart";

export default function CartDrawer() {
  const [products, setProducts] = useState([]);
  const { items, removeItem, isEmpty } = useCart();

  useEffect(() => {
    setProducts(items);
  });

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
          <ul className="menu min-h-full w-80 bg-white p-4 text-base-content text-center">
            <h4>Shopping Cart</h4>
            <div className="divider"></div>
            <h4 className="mt-4">Your cart is empty</h4>
            <li className="mt-8">Head over to the shop page to browse our products</li>
            <button className="btn btn-secondary mt-8">Shop</button>
          </ul>
        ) : (
          <ul
            className="menu min-h-full w-80 bg-white p-4 text-base-content text-center"
            suppressHydrationWarning
          >
            <h4>Shopping Cart</h4>
            <li className="mt-12">
              {products
                ? products.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col items-start text-left"
                    >
                      <h4 className="text-sm font-bold">{item.name}</h4>
                    </div>
                  ))
                : null}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
