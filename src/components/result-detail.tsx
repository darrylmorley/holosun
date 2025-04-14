"use client";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { useEffect, useRef } from "react";
import Cookies from "js-cookie";

const messages = {
  success: {
    title: "Thank you for your order!",
    body: (orderID) => (
      <>
        <p className="text-xl">
          Your order number is <span className="font-bold">{orderID}</span>
        </p>
        <p className="text-xl">
          Please allow for up to 2-4 working days for delivery.
        </p>
      </>
    ),
  },
  cancelled: {
    title: "Your order has been cancelled!",
    body: () => (
      <p className="text-xl">
        Go back to the{" "}
        <Link
          href="/"
          className="hover:text-secondary cursor-pointer underline"
        >
          Home page
        </Link>
      </p>
    ),
  },
  declined: {
    title: "There was a problem with your payment method.",
    body: () => (
      <>
        <p className="text-xl">
          You can return{" "}
          <Link
            href="/cart"
            className="hover:text-secondary cursor-pointer underline"
          >
            to your cart
          </Link>{" "}
          and try again
        </p>
        <p className="text-xl">
          Or, go back to the{" "}
          <Link
            href="/"
            className="hover:text-secondary cursor-pointer underline"
          >
            Home page
          </Link>
        </p>
      </>
    ),
  },
  exception: {
    title: "There was a problem with your payment method.",
    body: () => (
      <>
        <p className="text-xl">
          Go back to the{" "}
          <Link
            href="/"
            className="hover:text-secondary cursor-pointer underline"
          >
            Home page
          </Link>
        </p>
      </>
    ),
  },
};

export default function ResultDetail({ params, lsSale }) {
  // Store the initial values
  const orderID = useRef(lsSale).current;
  const accept = useRef(params.accept).current;
  const cleanupDone = useRef(false);
  const { emptyCart } = useCart();

  const message = messages[accept];

  // Use a one-time effect for cleanup
  useEffect(() => {
    if (message && !cleanupDone.current) {
      // Add a small delay to ensure the page renders first
      const timer = setTimeout(() => {
        // Clean up cookies
        if (Cookies.get("orderID")) Cookies.remove("orderID");
        if (Cookies.get("customerDetails")) Cookies.remove("customerDetails");
        if (Cookies.get("billingAddress")) Cookies.remove("billingAddress");
        if (Cookies.get("deliveryAddress")) Cookies.remove("deliveryAddress");

        // Empty the cart
        emptyCart();

        // Mark as done
        cleanupDone.current = true;
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [message, emptyCart]);

  if (!message) return null;

  return (
    <div className="mb-5 flex flex-col items-center space-y-8 py-8 text-fabgrey sm:mb-24">
      <p className="text-2xl font-semibold">{message.title}</p>
      {message.body(orderID)}
    </div>
  );
}
