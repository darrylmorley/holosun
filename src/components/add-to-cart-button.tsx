"use client";
import { useCart } from "react-use-cart";

import { formatCartItem, toggleDrawer } from "@/lib/helpers";

export default function AddToCartButton({ item }) {
  const { addItem, getItem } = useCart();
  const itemInCart = getItem(item.id);
  console.log(itemInCart);

  const handleAddToCartClick = () => {
    addItem(formatCartItem(item));
    toggleDrawer("cart-drawer");
  };

  const Button = (text, disabled) => (
    <button
      className={`btn w-full ${disabled ? "btn-disabled !bg-secondary !text-white" : "bg-accent hover:bg-accent-content text-white"}`}
      onClick={handleAddToCartClick}
      disabled={disabled}
    >
      {text}
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
