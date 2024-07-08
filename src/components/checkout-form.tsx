"use client";
import { useState, useEffect } from "react";
import { Store, Truck } from "lucide-react";
import { useCart } from "react-use-cart";
import { isValid } from "postcode";
import { z } from "zod";

import { config } from "../../config/config";

import { getFormattedPrice, isOutsideMainlandUK } from "@/lib/utils/helpers";
import { createLightspeedSale } from "@/lib/lightspeed/create-sale";
import { barclaysCheckoutForm } from "@/lib/epdq/epdq-form";

const formSchema = z.object({
  email: z.string().email(),
  delivery: z.enum(["delivery", "collection"]),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  billingAddress1: z.string().min(1, "Billing address is required"),
  billingCity: z
    .string()
    .min(1, "Billing city is required")
    .refine(
      (val) => {
        return /^[a-zA-Z\s]+$/.test(val);
      },
      {
        message: "Town or city name must only contain letters and spaces",
      }
    ),
  billingPostcode: z.string().regex(/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/, "Invalid postcode"),
  deliveryAddress1: z.string().optional(),
  deliveryCity: z
    .string()
    .optional()
    .refine(
      (val) => {
        return /^[a-zA-Z\s]+$/.test(val);
      },
      {
        message: "Town or city name must only contain letters and spaces",
      }
    ),
  deliveryPostcode: z.string().optional(),
  deliverySameAsBilling: z.boolean(),
});

export default function CheckoutForm({ stdDelivery, NIDelivery, setDeliveryItem }) {
  const { addItem, items, cartTotal, removeItem, totalUniqueItems, emptyCart } = useCart();

  const [errors, setErrors] = useState([]);

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

    if (!formData.deliverySameAsBilling && checked) {
      setFormData((prevData) => ({
        ...prevData,
        deliveryAddress1: "",
        deliveryCity: "",
        deliveryPostcode: "",
      }));

      removeDeliveryItem();
      setDeliveryItem(null);

      addDeliveryItem();
    }

    setFormData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const addDeliveryItem = () => {
    const { deliverySameAsBilling, billingPostcode, deliveryPostcode } = formData;
    const targetPostcode = deliverySameAsBilling ? billingPostcode : deliveryPostcode;

    if (targetPostcode && isValid(targetPostcode)) {
      const postage = isOutsideMainlandUK(targetPostcode) ? NIDelivery : stdDelivery;
      const existingDeliveryItem = items.find(
        (item) => Number(item.id) === 7476 || Number(item.id) === 8403
      );

      if (!existingDeliveryItem) {
        setDeliveryItem(postage);
        addItem(postage);
      }
    }
  };

  const removeDeliveryItem = () => {
    const deliveryItem = items.find((item) => Number(item.id) === 7476 || Number(item.id) === 8403);
    if (deliveryItem) {
      setDeliveryItem(null);
      removeItem(deliveryItem.id);
    }
  };

  const handleDeliverySelection = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, delivery: value });

    if (value === "collection") {
      removeDeliveryItem();
    } else if (value === "delivery") {
      addDeliveryItem();
    }
  };

  useEffect(() => {
    const { deliverySameAsBilling, billingPostcode, deliveryPostcode } = formData;
    const targetPostcode = deliverySameAsBilling ? billingPostcode : deliveryPostcode;

    if (targetPostcode && isValid(targetPostcode)) {
      addDeliveryItem();
    } else {
      removeDeliveryItem();
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [
    formData.billingPostcode,
    formData.deliveryPostcode,
    formData.deliverySameAsBilling,
    NIDelivery,
    stdDelivery,
  ]);

  // If 1 item in cart and is delivery, remove item
  useEffect(() => {
    if (totalUniqueItems === 1) {
      const item = items.find((item) => Number(item.id) === 7476 || Number(item.id) === 8403);
      if (item) {
        setDeliveryItem(null);
        emptyCart();
      }
    }
  }, [totalUniqueItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let lsSale;

    // Extract delivery address if different from billing
    const deliveryData = formData.deliverySameAsBilling
      ? {
          deliveryAddress1: formData.billingAddress1,
          deliveryCity: formData.billingCity,
          deliveryPostcode: formData.billingPostcode,
        }
      : {
          deliveryAddress1: formData.deliveryAddress1,
          deliveryCity: formData.deliveryCity,
          deliveryPostcode: formData.deliveryPostcode,
        };

    // Combine data for validation
    const dataToValidate = { ...formData, ...deliveryData };

    try {
      // validate form data
      formSchema.parse(dataToValidate);
      // Clear previous errors

      setErrors([]);

      if (config.env === "production") {
        // Get sale ID form epos in prod.
        lsSale = await createLightspeedSale(items);
      } else {
        // Use test Order Number for testing in dev.
        lsSale = "HOLO008";
      }

      // Create Barclay's checkout form
      barclaysCheckoutForm(
        cartTotal.toFixed(2).toString().replace(".", ""),
        dataToValidate,
        lsSale
      );
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Use a Set to store unique error messages
        const uniqueErrors = new Set();
        error.errors.forEach((err) => uniqueErrors.add(err.message));
        setErrors([...uniqueErrors]);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex-col items-end my-12 space-y-8 sm:mr-8"
    >
      {errors.length > 0 && (
        <div className="w-full bg-red-100 text-red-700 p-4 rounded">
          <ul>
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}
      <section className="w-full">
        <h2 className="self-start text-2xl mb-4">Contact</h2>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter Your Email"
          autoComplete="email"
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
              autoComplete="billing address-level2"
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
                    autoComplete="shipping address-level1"
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
        data-umami-event="checkout"
        title="Checkout"
      >
        Checkout
        <span>{getFormattedPrice(cartTotal)}</span>
      </button>
    </form>
  );
}
