"use client";
import { useCart } from "react-use-cart";
import { useEffect } from "react";
import Image from "next/image";

import { getFormattedPrice } from "@/lib/helpers";

export default function CheckoutSummary() {
  const { items, cartTotal, updateItemQuantity, removeItem } = useCart();

  const handleAddItem = (e, item) => {
    e.preventDefault();
    if (item.quantity < item.qoh) updateItemQuantity(item.id, item.quantity + 1);
  };

  const handleRemoveItem = (e, item) => {
    e.preventDefault();
    if (item.quantity > 1) updateItemQuantity(item.id, item.quantity - 1);
  };

  useEffect(() => {}, []);

  return (
    <>
      {items
        ? items.map((item) => {
            return (
              <section key={item.id}>
                <li className="flex">
                  <picture className="p-2 relative flex items-center justify-center mr-2 bg-stone-300">
                    <Image
                      src={item.image}
                      width={80}
                      height={80}
                      alt={item.name}
                    />
                  </picture>
                  <div className="flex flex-col gap-2 items-start text-sm">
                    <p>{item.name}</p>
                    <p>
                      {new Intl.NumberFormat("en-GB", {
                        style: "currency",
                        currency: "gbp",
                      }).format(item.price)}
                    </p>

                    <div className="flex items-center gap-12">
                      <form className="join">
                        <button
                          className="w-6 h-6 bg-stone-300 join-item"
                          onClick={(e) => handleRemoveItem(e, item)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          id="quantity"
                          type="number"
                          className="text-xs flex w-12 text-left h-6 items-center border-stone-100 bg-white text-gray-700 outline-none hover:text-black focus:text-black focus:outline-none"
                          value={item.quantity}
                          max={item.qoh}
                          disabled
                        />
                        <button
                          className="w-6 h-6 bg-stone-300 join-item"
                          onClick={(e) => handleAddItem(e, item)}
                          disabled={item.quantity >= item.qoh}
                        >
                          +
                        </button>
                      </form>
                      <p
                        onClick={() => removeItem(item.id)}
                        className="text-xs font-bold hover:text-accent cursor-pointer self-end"
                      >
                        Remove
                      </p>
                    </div>
                  </div>
                </li>
                <div className="divider" />
              </section>
            );
          })
        : null}
      <section className="flex flex-col w-full justify-between space-y-3">
        <div className="flex items-center justify-between ">
          <p>Subtotal</p>
          <p>{getFormattedPrice(cartTotal)}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Shipping</p>
          <p>Price</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold">Total</p>
          <p className="text-xl font-bold">{cartTotal}</p>
        </div>
      </section>
    </>
  );
}
