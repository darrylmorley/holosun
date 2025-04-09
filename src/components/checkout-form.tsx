"use client";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { Store, Truck } from "lucide-react";
import { useCart } from "react-use-cart";
import { isValid } from "postcode";
import { z } from "zod";

import { isOutsideMainlandUK } from "@/lib/utils/helpers";
import { createLightspeedSale } from "@/lib/lightspeed/create-sale";
import { getPaymentURL } from "@/lib/worldpay/paymentRequest";

import AddressFinder from "./address-finder";
import WorldpayCheckout from "./worldpay-checkout";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email(),
  tel: z.string().regex(/^\+?[0-9\s\-().]{7,20}$/, {
    message: 'Invalid phone number',
  }),
  billingAddress1: z.string().min(1, "Billing address is required"),
  billingAddreess2: z.string().optional(),
  billingCity: z
    .string()
    .min(1, "Billing city is required"),
  billingCounty: z.string().optional(),
  billingPostcode: z.string().regex(/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/, "Invalid postcode"),
  deliveryAddress1: z.string().optional(),
  deliveryAddress2: z.string().optional(),
  deliveryCity: z
    .string()
    .optional(),
  deliveryCounty: z.string().optional(),
  deliveryPostcode: z.string().optional(),
  deliverySameAsBilling: z.boolean(),
  delivery: z.enum(["delivery", "collection"]),
});

export default function CheckoutForm({ stdDelivery, NIDelivery, setDeliveryItem }) {
  const { addItem, items, cartTotal, removeItem, totalUniqueItems, emptyCart } = useCart();

  const [submitDisabled, setSubmitDisabled] = useState(false);
  const [billingAddress, setBillingAddress] = useState("")
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [paymentURL, setPaymentURL] = useState(null);

  const [errors, setErrors] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    tel: "",
    billingAddress1: "",
    billingAddress2: "",
    billingCity: "",
    billingCounty: "",
    billingPostcode: "",
    deliveryAddress1: "",
    deliveryAddress2: "",
    deliveryCity: "",
    deliveryCounty: "",
    deliveryPostcode: "",
    delivery: "delivery",
    deliverySameAsBilling: true,
  });

  // Use a useEffect to sync billingAddress state with formData
  useEffect(() => {
    if (billingAddress) {
      setFormData((prevData) => ({
        ...prevData,
        billingAddress1: billingAddress.line_1,
        billingAddress2: billingAddress.line_2,
        billingCity: billingAddress.post_town,
        billingCounty: billingAddress.postal_county,
        billingPostcode: billingAddress.postcode,
      }));
    }
  }, [billingAddress]);

  // Use a useEffect to sync deliveryAddress state with formData
  useEffect(() => {
    if (deliveryAddress) {
      setFormData((prevData) => ({
        ...prevData,
        deliveryAddress1: deliveryAddress.line_1,
        deliveryAddress2: deliveryAddress.line_2,
        deliveryCity: deliveryAddress.post_town,
        deliveryCounty: deliveryAddress.postal_county,
        deliveryPostcode: deliveryAddress.postcode,
      }));
    }
  }, [deliveryAddress]);

  useEffect(() => console.log("Form Data:", formData), [formData]);
  useEffect(() => console.log("Billing Address:", billingAddress), [billingAddress]);

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
    let lsSale;
    e.preventDefault();
    setSubmitDisabled(true);

    if (!billingAddress) {
      alert("Please select a billing address.");
      return;
    }

    if (!formData.deliverySameAsBilling && !deliveryAddress) {
      alert("Please select a delivery address.");
      return;
    }

    // Extract delivery address if different from billing
    const deliveryData = formData.deliverySameAsBilling
      ? {
        deliveryAddress1: formData.billingAddress1,
        deliveryAddress2: formData.billingAddress2,
        deliveryCity: formData.billingCity,
        deliveryCounty: formData.billingCounty,
        deliveryPostcode: formData.billingPostcode,
      }
      : {
        deliveryAddress1: formData.deliveryAddress1,
        deliveryAddress2: formData.deliveryAddress2,
        deliveryCity: formData.deliveryCity,
        deliveryCounty: formData.deliveryCounty,
        deliveryPostcode: formData.deliveryPostcode,
      };

    // Combine data for validation
    const dataToValidate = { ...formData, ...deliveryData };

    try {
      lsSale = Cookies.get("orderID");

      // validate form data
      formSchema.parse(dataToValidate);
      // Clear previous errors
      setErrors([]);

      if (process.env.NODE_ENV == "production" && !lsSale) {
        // Only create a new sale if we don't have one in production.
        lsSale = await createLightspeedSale(items);
      } else if (!lsSale) {
        // Use test Order Number for testing in dev.
        lsSale = "HOLO001";
      }

      Cookies.set("orderID", lsSale);
      Cookies.set("formData", JSON.stringify(formData));

      const worldPayPaymentURL = await getPaymentURL({
        amount: Math.round(cartTotal * 100),
        orderNumber: lsSale,
        formData
      });

      if (worldPayPaymentURL.url) {
        setPaymentURL(() => worldPayPaymentURL.url);
        setSubmitDisabled(false);
      } else {
        console.error("Failed to get payment URL");
        alert(
          "Something went wrong while processing your order. Please try again.",
        );
        setSubmitDisabled(false);
      }
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
    <>
      {paymentURL && <WorldpayCheckout paymentURL={paymentURL} />}
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
        <section className="w-full space-y-4">
          <h2 className="self-start text-2xl mb-4">Contact</h2>
          <div className="flex space-x-2 mb-4">
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
            type="email"
            name="email"
            value={formData.email}
            placeholder="Enter Your Email"
            autoComplete="email"
            required
            onChange={handleInputChange}
            className="input input-bordered w-full rounded-sm"
          />
          <input
            type="tel"
            name="tel"
            value={formData.tel}
            placeholder="Enter Your Phone Number"
            autoComplete="tel"
            required
            onChange={handleInputChange}
            className="input input-bordered w-full rounded-sm"
          />
        </section>
        <section className="w-full">
          <h2 className="self-start text-2xl mb-4">Billing Details</h2>
          <fieldset className="mt-6">
            <AddressFinder selected={billingAddress} setSelected={setBillingAddress} />
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
                  <h2 className="my-3 text-base">Delivery Details</h2>
                  <AddressFinder selected={deliveryAddress} setSelected={setDeliveryAddress} />
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
          className="btn btn-secondary hover:btn-accent hover:text-white text-white w-full"
          data-umami-event="checkout"
          title="Checkout"
          disabled={submitDisabled}
        >
          {submitDisabled ? (
            <svg
              className="h-5 w-5 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </>
  );
}