"use client";
import { useCart } from "react-use-cart";

import { formatCartItem } from "@/lib/helpers";

export default function AddToCartButton({ item }) {
  const { addItem } = useCart();

  return (
    <div>
      <button
        className="btn w-full rounded-sm bg-accent text-white"
        onClick={() => addItem(formatCartItem(item))}
      >
        Add to Cart
      </button>
    </div>
  );
}