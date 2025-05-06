"use client";

import { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import { useCart } from "react-use-cart";

export default function CartIcon() {
  const { isEmpty } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // During SSR and initial client render, use a consistent icon
  if (!isMounted) {
    return <ShoppingBag size={22} className="cursor-pointer" />;
  }

  // After hydration is complete, render the appropriate icon
  return isEmpty ? (
    <ShoppingBag size={22} className="cursor-pointer" />
  ) : (
    <ShoppingBag size={26} className="cursor-pointer" fill="#333" stroke="#fff" />
  );
}