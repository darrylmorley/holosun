"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function ClearCookies() {
  useEffect(() => {
    // Clear all cookies using the same library that set them
    Cookies.remove("orderID");
    Cookies.remove("formData");
    Cookies.remove("paymentURL");
    Cookies.remove("paymentInitiated");
  }, []);

  return null;
}