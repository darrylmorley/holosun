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

    // Log the full response first, before any processing
    console.log("Worldpay raw response:", responseData);

    // Store transaction reference for debugging
    const orderID = Cookies.get("orderID");

    // Create enhanced data with order ID from cookies
    const enhancedData = {
      worldpayResponse: responseData,
      orderID: orderID,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };

    // Send to server-side logging endpoint with enhanced data
    fetch('/api/worldpay-callback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(enhancedData),
      keepalive: true
    }).catch(err => console.error("Failed to log payment callback:", err));

    try {
      // If order object is missing but we have order ID from cookies
      if ((!responseData || !responseData.order) && orderID) {
        console.warn("Order data missing in Worldpay response, using order ID from cookies:", orderID);

        // Get status from response or assume error
        const status = responseData?.status || "error";

        // Redirect based on assumed status
        redirectUrl = status === "success"
          ? `${config.URLs.acceptURL}?orderID=${orderID}`
          : `${config.URLs.exceptionurl}?reason=incomplete_response&orderID=${orderID}`;

        window.location = redirectUrl;
        return;
      }

      // Check if order exists
      if (!responseData || !responseData.order) {
        console.error("Invalid Worldpay response - missing order data:", responseData);
        redirectUrl = config.URLs.exceptionurl;
        window.location = redirectUrl;
        return;
      }

      const status = responseData.order.status;
      console.log("Worldpay response status:", status);
      console.log("Worldpay response data:", JSON.stringify(responseData, null, 2));

      // Save response to localStorage for debugging later
      try {
        localStorage.setItem('lastWorldpayResponse', JSON.stringify({
          timestamp: new Date().toISOString(),
          data: responseData
        }));
      } catch (storageError) {
        console.error("Failed to save Worldpay response to storage:", storageError);
      }

      switch (status) {
        case "success":
          redirectUrl = `${config.URLs.acceptURL}?orderID=${orderID || responseData.order.orderCode}`;
          break;
        case "failure":
          console.error("Payment failed:", responseData.order.errorDetails || "No error details provided");
          redirectUrl = `${config.URLs.declineURL}?orderID=${orderID || responseData.order.orderCode}`;
          break;
        case "error":
          console.error("Payment error:", responseData.order.errorDetails || "No error details provided");
          redirectUrl = `${config.URLs.exceptionurl}?orderID=${orderID || responseData.order.orderCode}`;
          break;
        default:
          console.warn(`Unexpected payment status: ${status}`);
          redirectUrl = `${config.URLs.cancelurl}?orderID=${orderID || responseData.order.orderCode}`;
      }

      // Short delay before redirect to ensure logs are visible/processed
      setTimeout(() => {
        // Add more comprehensive debugging information
        const debugInfo = encodeURIComponent(JSON.stringify({
          status: status,
          orderCode: responseData.order.orderCode || 'unknown',
          orderID: Cookies.get("orderID") || 'unknown',
          timestamp: new Date().toISOString()
        }));

        // Append orderID and debugging info to the redirect URL
        const orderID = Cookies.get("orderID") || responseData.order.orderCode;
        redirectUrl = `${redirectUrl}${redirectUrl.includes('?') ? '&' : '?'}orderID=${orderID}&wpDebug=${debugInfo}`;

        // Clear the payment initiated flag before redirecting
        Cookies.remove("paymentInitiated");

        console.log(`Redirecting to ${redirectUrl}`);
        window.location = redirectUrl;
      }, 2000); // Increased to 2 seconds

    } catch (error) {
      console.error("Error processing Worldpay response:", error, "Original response:", responseData);
      window.location = config.URLs.exceptionurl;
    }
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
      try {
        if (!window.WPCL) throw new Error("Worldpay library not loaded");

        // Store that we've initiated payment
        Cookies.set("paymentInitiated", "true");

        // Log initialization
        console.log("Initializing Worldpay payment:", {
          url: paymentURL ? paymentURL.substring(0, 30) + "..." : "missing",
          orderID: Cookies.get("orderID") || "unknown"
        });

        // Initialize the library and pass options
        const customOptions = {
          url: paymentURL,
          type: "iframe",
          inject: "immediate",
          target: "checkout",
          accessibility: true,
          debug: true,
          disableScrolling: true,
          resultCallback: (response) => {
            console.log("Worldpay result callback triggered:", response);
            handleCheckoutResponse(response);
          },
          errorCallback: (error) => {
            console.error("Worldpay error callback triggered:", error);
            setError(`Payment system error: ${error.message || 'Unknown error'}`);
          }
        };
        const libraryObject = new window.WPCL.Library();
        libraryObject.setup(customOptions);
      } catch (initError) {
        console.error("Error initializing Worldpay library:", initError);
        setError("Failed to initialize payment system");
      }
    };

    return () => {
      // Safer cleanup that checks if the script still exists
      const scriptToRemove = document.getElementById("worldpay-script");
      if (scriptToRemove && scriptToRemove.parentNode) {
        scriptToRemove.parentNode.removeChild(scriptToRemove);
      }
    };
  }, [paymentURL]);

  useEffect(() => {
    const handlePostMessage = (event) => {
      // Check if it might be from Worldpay (you may need to adjust this check)
      console.log("Received postMessage event:", event);

      if (event.data && typeof event.data === 'object') {
        // Log all postMessage events to help debug
        console.log("PostMessage data:", event.data);

        // Optionally save to localStorage
        try {
          const existing = JSON.parse(localStorage.getItem('worldpayPostMessages') || '[]');
          existing.push({
            timestamp: new Date().toISOString(),
            data: event.data
          });
          localStorage.setItem('worldpayPostMessages', JSON.stringify(existing.slice(-5))); // Keep last 5
        } catch (err) {
          console.error("Failed to save postMessage:", err);
        }
      }
    };

    window.addEventListener('message', handlePostMessage);

    return () => {
      window.removeEventListener('message', handlePostMessage);
    };
  }, []);

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
