"use client";
import { useState } from "react";
import dynamic from "next/dynamic";

const CheckoutForm = dynamic(() => import("./checkout-form"), { ssr: false });
const CheckoutSummary = dynamic(() => import("./checkout-summary"), { ssr: false });

export default function CheckoutFull({ stdDelivery, NIDelivery }) {
  const [deliveryItem, setDeliveryItem] = useState(null);

  return (
    <div>
      <h1 className="sr-only">Checkout Page</h1>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="h-full w-full lg:pl-56 px-4 lg:px-8 order-last lg:order-first">
          <CheckoutForm
            stdDelivery={stdDelivery}
            NIDelivery={NIDelivery}
            setDeliveryItem={setDeliveryItem}
          />
        </div>
        <div className="h-full w-full bg-stone-100 p-4 lg:p-8 lg:pr-56">
          <CheckoutSummary deliveryItem={deliveryItem} />
        </div>
      </div>
    </div>
  );
}
