"use client";
import { useCart } from "react-use-cart";
import { useState, useEffect } from "react";
import { Store, Truck } from "lucide-react";
import { isOutsideMainlandUK } from "@/lib/helpers";

export default function CheckoutForm({ stdDelivery, NIDelivery }) {
  console.log(stdDelivery, NIDelivery);

  const { setCartMetadata } = useCart();

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
    billingSameAsDelivery: true,
  });

  const handleDeliverySelection = (e) => {
    setFormData({ ...formData, delivery: e.target.value });
  };

  // useEffect(() => {
  //   console.log(formData);
  // }, [
  //   formData,
  //   formData.delivery,
  //   formData.firstName,
  //   formData.lastName,
  //   formData.address1,
  //   formData.city,
  //   formData.postcode,
  // ]);

  useEffect(() => {
    if (formData.billingSameAsDelivery && formData.billingPostcode !== "") {
      const postage = isOutsideMainlandUK(formData.billingPostcode) ? NIDelivery : stdDelivery;
      setCartMetadata({ delivery: postage });
    }

    if (!formData.billingSameAsDelivery && formData.deliveryPostcode !== "") {
      const postage = isOutsideMainlandUK(formData.deliveryPostcode) ? NIDelivery : stdDelivery;
      setCartMetadata({ delivery: postage });
    }
  }, [
    formData.billingSameAsDelivery,
    formData.billingPostcode,
    formData.deliveryPostcode,
    NIDelivery,
    stdDelivery,
    setCartMetadata,
  ]);

  return (
    <form
      action=""
      className="flex-col items-end mr-8 my-12 space-y-8"
    >
      <section className="w-full">
        <h2 className="self-start text-2xl mb-4">Contact</h2>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Your Email"
          className="input input-bordered w-full rounded-sm"
        />
      </section>
      <section className="w-full">
        <h2 className="self-start text-2xl mb-4">Billing Details</h2>
        <fieldset className="mt-6">
          <div className="flex gap-2">
            <input
              type="text"
              name="billing-details"
              id="firstName"
              placeholder="First Name"
              className="input input-bordered w-full rounded-sm"
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            />
            <input
              type="text"
              name="billing-details"
              id="lastName"
              placeholder="Last Name"
              className="input input-bordered w-full rounded-sm"
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
          </div>
          <input
            type="text"
            name="billing-details"
            id="address1"
            placeholder="First Line of Address"
            className="mt-3 input input-bordered w-full rounded-sm"
            onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
          />
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              name="billing-details"
              id="city"
              placeholder="City"
              className="input input-bordered w-full rounded-sm"
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
            <input
              type="text"
              name="billing-details"
              id="postcode"
              placeholder="Postcode"
              className="input input-bordered w-full rounded-sm"
              onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
            />
          </div>
        </fieldset>
      </section>
      <section className="w-full">
        <h2 className="self-start text-2xl mb-4">Delivery</h2>
        <fieldset className="w-full">
          <legend className="sr-only">Choose a Delivery Method</legend>
          <label htmlFor="delivery">
            <div className="px-4 h-[3rem] flex items-center justify-between border border-[var(--fallback-bc,oklch(var(--bc)/0.2))] rounded-t-sm">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="delivery"
                  id="delivery"
                  value="delivery"
                  className="radio text-black mr-2"
                  defaultChecked
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
            <div className="px-4 h-[3rem] flex items-center justify-between border-b border-r border-l border-[var(--fallback-bc,oklch(var(--bc)/0.2))] rounded-b-sm">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="delivery"
                  id="collection"
                  value="collection"
                  className="radio text-black mr-2"
                  onChange={handleDeliverySelection}
                />
                <span>Collection</span>
              </div>
              <p>
                <Store />
              </p>
            </div>
          </label>
        </fieldset>
        <div className="mt-6 w-full p-4 border border-[var(--fallback-bc,oklch(var(--bc)/0.2))] rounde-sm">
          <label
            htmlFor="delivery-same-as-billing"
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              name="delivery-same-as-billing"
              id="delivery-same-as-billing"
              defaultChecked
              className="checkbox text-black mr-2"
              onChange={(e) =>
                setFormData({ ...formData, billingSameAsDelivery: e.target.checked })
              }
            />
            <p className="text-sm">My delivery address is the same as the billing address above.</p>
          </label>
        </div>
        {formData.delivery === "delivery" ? (
          formData.billingSameAsDelivery === false ? (
            <>
              <fieldset className="mt-3">
                <h2 className="mt-3 text-base">Delivery Details</h2>
                <input
                  type="text"
                  name="delivery-details"
                  id="address1"
                  placeholder="First Line of Address"
                  className="mt-3 input input-bordered w-full rounded-sm"
                  onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                />
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    name="delivery-details"
                    id="city"
                    placeholder="City"
                    className="input input-bordered w-full rounded-sm"
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                  <input
                    type="text"
                    name="delivery-details"
                    id="postcode"
                    placeholder="Postcode"
                    className="input input-bordered w-full rounded-sm"
                    onChange={(e) => setFormData({ ...formData, postcode: e.target.value })}
                  />
                </div>
              </fieldset>
            </>
          ) : null
        ) : (
          <div className="mt-6 flex flex-col">
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
    </form>
  );
}
