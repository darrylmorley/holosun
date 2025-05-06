"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function CartDrawerItems({ items, updateItemQuantity, removeItem }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddItem = (e, item) => {
    e.preventDefault();
    if (item.quantity < item.qoh) updateItemQuantity(item.id, item.quantity + 1);
  };

  const handleRemoveItem = (e, item) => {
    e.preventDefault();
    if (item.quantity > 1) updateItemQuantity(item.id, item.quantity - 1);
  };

  // Display a placeholder during SSR and initial render
  if (!isClient) {
    return <div className="flex-1 animate-pulse bg-gray-100"></div>;
  }

  // Filter out shipping items
  const displayItems = items?.filter(item => item.id !== 7476 && item.id !== 8403) || [];

  // If no items to display, return an empty div to avoid structure changes
  if (displayItems.length === 0) {
    return <div className="flex-1"></div>;
  }

  return (
    <div className="flex-1">
      <ul>
        {displayItems.map((item) => (
          <li key={item.id}>
            <div className="flex">
              <picture className="relative flex items-center justify-center min-w-20 min-h-20 mr-2 bg-stone-300">
                <Image
                  src={item.image}
                  width={80}
                  height={80}
                  alt={item.name}
                />
              </picture>
              <div className="flex flex-col gap-1 items-start text-sm">
                <p>{item.name}</p>
                <p>
                  {new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "gbp",
                  }).format(item.price)}
                </p>

                <div className="flex items-center gap-8">
                  <form className="join">
                    <button
                      className="w-6 h-6 bg-stone-100 join-item"
                      onClick={(e) => handleRemoveItem(e, item)}
                      disabled={item.quantity <= 1}
                      title="Minus Item Quantity"
                      type="button"
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
                      title="Quantity Display"
                    />
                    <button
                      className="w-6 h-6 bg-stone-100 join-item"
                      onClick={(e) => handleAddItem(e, item)}
                      disabled={item.quantity >= item.qoh}
                      title="Add Item Quantity"
                      type="button"
                    >
                      +
                    </button>
                  </form>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-xs font-bold hover:text-accent cursor-pointer"
                    title="Remove Item"
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
            <div className="divider" />
          </li>
        ))}
      </ul>
    </div>
  );
}
