"use client";
import { useCart } from "react-use-cart";
import { ShoppingBag } from "lucide-react";

import { formatCartItem, toggleDrawer } from "@/lib/utils/helpers";

export default function AddToCartButton({ item }) {
  const { addItem, getItem } = useCart();
  const itemInCart = getItem(item.id);

  const handleAddToCartClick = () => {
    addItem(formatCartItem(item));
    toggleDrawer("cart-drawer");
  };

  const Button = (text, disabled) => (
    <button
      className={`
      w-full
      py-2
      text-lg
      font-bold
      rounded
      shadow-lg
      transition-all
      duration-200
      flex items-center justify-center gap-4
      ${disabled
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "bg-black text-white hover:bg-gray-800 border-b-4 border-transparent hover:border-red-600 focus:ring-2 focus:ring-red-600"
        }
    `}
      onClick={handleAddToCartClick}
      disabled={disabled}
      data-umami-event="add-to-cart"
      title="Add to Cart"
      type="button"
    >
      {text}
      <ShoppingBag />
    </button>
  );

  if (itemInCart && itemInCart.quantity == item.qoh) {
    return <div>{Button("No Further Stock Available", true)}</div>;
  }

  if (item.isOnBackorder && item.qoh <= 0) {
    return <div>{Button("On Order", true)}</div>;
  }

  if (item.qoh <= 0 && !item.isOnBackorder) {
    return <div>{Button("Out of Stock", true)}</div>;
  }

  return <div>{Button("Add to Cart", false)}</div>;
}
