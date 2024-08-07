"use client";
import { useCart } from "react-use-cart";

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
      className={`btn w-full ${disabled ? "btn-disabled !bg-secondary !text-white" : "bg-secondary hover:bg-accent hover:text-white text-white"}`}
      onClick={handleAddToCartClick}
      disabled={disabled}
      data-umami-event="add-to-cart"
      title="Add to Cart"
      type="button"
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
