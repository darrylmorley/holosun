"use client";

import { CartProvider } from "react-use-cart";

export function Providers({ children }) {
  return <CartProvider id="holosun-cart">{children}</CartProvider>;
}
