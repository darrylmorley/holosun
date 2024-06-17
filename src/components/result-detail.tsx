"use client";

import Link from "next/link";
import { useCart } from "react-use-cart";

export default function ResultDetail({ params, lsSale }) {
  const { accept, orderID, STATUS, COMPLUS, amount } = params;
  const { emptyCart } = useCart();

  if (accept === "true" && STATUS === "9") {
    emptyCart();

    return (
      <div className="flex flex-col items-center py-8 mb-5 space-y-8 sm:mb-24 text-fabgrey">
        <p className="text-2xl font-semibold">Thank you for your order!</p>
        <p className="text-xl">
          Your order number is <span className="font-bold">{orderID}</span>
        </p>
        <p className="text-xl">Please allow for up to 2-4 working days for delivery.</p>
      </div>
    );
  }

  if (accept === "cancelled") {
    emptyCart();

    return (
      <div className="flex flex-col items-center py-8 mb-5 space-y-8 sm:mb-24 text-fabgrey">
        <p className="text-2xl font-semibold">Your order has been cancelled!</p>
        <p className="text-xl">
          Go back to the{" "}
          <Link
            href="/"
            className="underline cursor-pointer hover:text-secondary"
          >
            Home page
          </Link>
        </p>
      </div>
    );
  }

  if (accept === "false") {
    return (
      <div className="flex flex-col items-center py-8 mb-5 space-y-4 sm:mb-24 text-fabgrey">
        <p className="text-2xl font-semibold">There was a problem with your payment method.</p>

        <p className="text-xl">
          You can return{" "}
          <Link
            href="/cart"
            passHref
            className="underline cursor-pointer hover:text-secondary"
          >
            to your cart
          </Link>{" "}
          and try again
        </p>

        <p className="text-xl">
          Or, go back to the{" "}
          <Link
            href="/"
            className="underline cursor-pointer hover:text-secondary"
          >
            Home page
          </Link>
        </p>
      </div>
    );
  }
}
