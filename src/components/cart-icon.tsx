"use client";

import { useRef } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "react-use-cart";

export default function CartIcon() {
  const { isEmpty } = useCart();
  const hasMounted = useRef(false);

  if (!hasMounted.current) {
    hasMounted.current = true;
    return <ShoppingBag size={22} className="cursor-pointer" />;
  }

  return isEmpty ? (
    <ShoppingBag size={22} className="cursor-pointer" />
  ) : (
    <ShoppingBag size={26} className="cursor-pointer" fill="#333" stroke="#fff" />
  );
}