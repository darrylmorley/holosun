"use client";
import { useState, useEffect } from "react";
import { Store, Truck } from "lucide-react";
import { useCart } from "react-use-cart";
import { isValid } from "postcode";

import { formatCartItem, getFormattedPrice, isOutsideMainlandUK } from "@/lib/utils/helpers";

export default function CheckoutForm({ stdDelivery, NIDelivery }) {
  const { addItem, setCartMetadata, items, metadata, cartTotal, clearCartMetadata } = useCart();

  const [formData, setFormData] = useState({
    email: "",
    delivery: "delivery",
    firstName: "",
    lastName: "",
    billingAddress1: "",
    billingCity: "",
    billingPostcode: "",
    deliveryAddress1: "",
    deliveryCity: "",
    deliveryPostcode: "",
    deliverySameAsBilling: true,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const handleDeliverySelection = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, delivery: value });

    if (value === "collection") {
      setCartMetadata({ delivery: null });
    } else if (value === "delivery") {
      const { deliverySameAsBilling, billingPostcode, deliveryPostcode } = formData;
      const targetPostcode = deliverySameAsBilling ? billingPostcode : deliveryPostcode;

      if (targetPostcode && isValid(targetPostcode)) {
        const postage = isOutsideMainlandUK(targetPostcode) ? NIDelivery : stdDelivery;
        setCartMetadata({ delivery: postage });
      }
    }
  };

  // Clear delivery metadata on page load
  useEffect(() => {
    clearCartMetadata("delivery");
  }, []);

  useEffect(() => {
    const { deliverySameAsBilling, billingPostcode, deliveryPostcode } = formData;
    const targetPostcode = deliverySameAsBilling ? billingPostcode : deliveryPostcode;

    if (targetPostcode && isValid(targetPostcode)) {
      const postage = isOutsideMainlandUK(targetPostcode) ? NIDelivery : stdDelivery;
      setCartMetadata({ delivery: postage });
    }
  }, [
    formData.billingPostcode,
    formData.deliveryPostcode,
    formData.deliverySameAsBilling,
    NIDelivery,
    stdDelivery,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    // console.log("Form submitted:", formData);
    // console.log("Cart data: ", items, metadata, cartTotal);
    console.log(items, cartTotal);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex-col items-end my-12 space-y-8 sm:mr-8"
    >
      <section className="w-full">
        <h2 className="self-start text-2xl mb-4">Contact</h2>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter Your Email"
          required
          onChange={handleInputChange}
          className="input input-bordered w-full rounded-sm"
        />
      </section>
      <section className="w-full">
        <h2 className="self-start text-2xl mb-4">Billing Details</h2>
        <fieldset className="mt-6">
          <div className="flex gap-2">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              autoComplete="given-name"
              required
              onChange={handleInputChange}
              className="input input-bordered w-full rounded-sm"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              autoComplete="family-name"
              required
              onChange={handleInputChange}
              className="input input-bordered w-full rounded-sm"
            />
          </div>
          <input
            type="text"
            name="billingAddress1"
            placeholder="First Line of Address"
            value={formData.billingAddress1}
            autoComplete="billing address-line1"
            required
            onChange={handleInputChange}
            className="mt-3 input input-bordered w-full rounded-sm"
          />
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              name="billingCity"
              placeholder="City"
              value={formData.billingCity}
              autoComplete="billing address-city"
              required
              onChange={handleInputChange}
              className="input input-bordered w-full rounded-sm"
            />
            <input
              type="text"
              name="billingPostcode"
              placeholder="Postcode"
              value={formData.billingPostcode}
              autoComplete="billing postal-code"
              required
              onChange={handleInputChange}
              className="input input-bordered w-full rounded-sm"
              pattern="^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$"
              title="Please enter a valid UK postcode."
            />
          </div>
        </fieldset>
      </section>
      <section className="w-full">
        <h2 className="self-start text-2xl mb-4">Delivery</h2>
        <fieldset className="w-full">
          <legend className="sr-only">Choose a Delivery Method</legend>
          <label htmlFor="delivery">
            <div className="px-4 h-[3rem] flex items-center justify-between border border-[var(--fallback-bc,oklch(var(--bc)/0.2))] rounded-t-sm w-full">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="delivery"
                  id="delivery"
                  value="delivery"
                  className="radio text-black mr-2"
                  checked={formData.delivery === "delivery"}
                  onChange={handleDeliverySelection}
                />
                <span>Delivery</span>
              </div>
              <p>
                <Truck />
              </p>
            </div>
          </label>
          <label htmlFor="collection">
            <div className="px-4 h-[3rem] flex items-center justify-between border-b border-r border-l border-[var(--fallback-bc,oklch(var(--bc)/0.2))] rounded-b-sm w-full">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="delivery"
                  id="collection"
                  value="collection"
                  checked={formData.delivery === "collection"}
                  onChange={handleDeliverySelection}
                  className="radio text-black mr-2"
                />
                <span>Collection</span>
              </div>
              <p>
                <Store />
              </p>
            </div>
          </label>
        </fieldset>
        <div className="mt-6 w-full p-4 border border-[var(--fallback-bc,oklch(var(--bc)/0.2))] rounded-sm">
          <label
            htmlFor="deliverySameAsBilling"
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              name="deliverySameAsBilling"
              id="deliverySameAsBilling"
              checked={formData.deliverySameAsBilling}
              onChange={handleCheckboxChange}
              className="checkbox text-black mr-2"
            />
            <p className="text-sm">My delivery address is the same as the billing address above.</p>
          </label>
        </div>
        {formData.delivery === "delivery" ? (
          !formData.deliverySameAsBilling && (
            <>
              <fieldset className="mt-3 w-full">
                <h2 className="mt-3 text-base">Delivery Details</h2>
                <input
                  type="text"
                  name="deliveryAddress1"
                  placeholder="First Line of Address"
                  value={formData.deliveryAddress1}
                  autoComplete="shipping address-line1"
                  onChange={handleInputChange}
                  className="mt-3 input input-bordered w-full rounded-sm"
                />
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    name="deliveryCity"
                    placeholder="City"
                    value={formData.deliveryCity}
                    autoComplete="shipping address-city"
                    onChange={handleInputChange}
                    className="input input-bordered w-full rounded-sm"
                  />
                  <input
                    type="text"
                    name="deliveryPostcode"
                    placeholder="Postcode"
                    value={formData.deliveryPostcode}
                    autoComplete="shipping postal-code"
                    onChange={handleInputChange}
                    pattern="^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$"
                    title="Please enter a valid UK postcode."
                    className="input input-bordered w-full rounded-sm"
                  />
                </div>
              </fieldset>
            </>
          )
        ) : (
          <div className="mt-6 flex flex-col w-full">
            <h3 className="text-xl">Collect From</h3>
            <div className="p-4 mt-3 h-full w-full border rounded-sm align-middle bg-stone-100">
              <p>Shooting Supplies Ltd</p>
              <p>38 Sherwood Road</p>
              <p>Bromsgrove</p>
              <p>B60 3DR</p>
            </div>
          </div>
        )}
      </section>
      <button
        type="submit"
        className="btn btn-accent text-white w-full"
      >
        Checkout
        <span>
          {metadata?.delivery
            ? getFormattedPrice(cartTotal + metadata.delivery.price)
            : getFormattedPrice(cartTotal)}
        </span>
      </button>
    </form>
  );
}
