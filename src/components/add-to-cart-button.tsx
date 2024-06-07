"use client";
import { useCart } from "react-use-cart";

import { formatCartItem } from "@/lib/helpers";

export default function AddToCartButton({ item }) {
  const { addItem } = useCart();

  const handleAddToCartClick = () => {
    addItem(formatCartItem(item));
    document.getElementById("cart-drawer")?.click();
  };

  return (
    <div>
      <button
        className="btn w-full bg-accent hover:bg-accent-content text-white"
        onClick={() => handleAddToCartClick()}
      >
        Add to Cart
      </button>
    </div>
  );
}
