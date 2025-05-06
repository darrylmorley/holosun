"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { config } from "../../config/config";

declare global {
  interface Window {
    WPCL?: {
      Library: new () => {
        setup: (options: Record<string, any>) => void;
      };
    };
  }
}

const WorldpayCheckout = ({ paymentURL }) => {
  const [error, setError] = useState(null);

  const handleCheckoutResponse = (responseData) => {
    let redirectUrl;
    const status = responseData.order.status;
    switch (status) {
      case "success":
        redirectUrl = config.URLs.acceptURL;
        break;
      case "failure":
        redirectUrl = config.URLs.declineURL;
        break;
      case "error":
        redirectUrl = config.URLs.exceptionurl;
        break;
      default:
        redirectUrl = config.URLs.cancelurl;
    }
    window.location = redirectUrl;
  };

  useEffect(() => {
    // Listen for online/offline events
    const handleOnline = () => {
      // If we were offline and are now online, check if payment is incomplete
      const paymentURL = Cookies.get("paymentURL");
      const paymentInitiated = Cookies.get("paymentInitiated");

      if (paymentURL && paymentInitiated) {
        // Optionally refresh the payment page or show a notification
        alert("Your connection has been restored. You can continue with your payment.");
      }
    };

    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  useEffect(() => {
    // Clear any previous scripts to avoid conflicts
    const existingScript = document.getElementById("worldpay-script");
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.id = "worldpay-script";
    script.src =
      "https://payments.worldpay.com/resources/hpp/integrations/embedded/js/hpp-embedded-integration-library.js";
    script.async = true;
    script.onerror = (e) => {
      console.error("Failed to load Worldpay script:", e);
      setError("Failed to load payment system");
    };

    document.head.appendChild(script);

    script.onload = () => {
      if (!window.WPCL) throw new Error("Worldpay library not loaded");
      // Initialize the library and pass options
      const customOptions = {
        url: paymentURL,
        type: "iframe",
        inject: "immediate",
        target: "checkout",
        accessibility: true,
        debug: false,
        disableScrolling: true,
        resultCallback: (response) => {
          handleCheckoutResponse(response);
        },
      };
      const libraryObject = new window.WPCL.Library();
      libraryObject.setup(customOptions);
    };

    return () => {
      // Safer cleanup that checks if the script still exists
      const scriptToRemove = document.getElementById("worldpay-script");
      if (scriptToRemove && scriptToRemove.parentNode) {
        scriptToRemove.parentNode.removeChild(scriptToRemove);
      }
    };
  }, [paymentURL]);

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70  ">
      <div className="worldpay-container w-full max-w-xl">
        <div id="checkout" className="min-h-[400px] w-full"></div>
      </div>
    </div>
  );
};

export default WorldpayCheckout;
