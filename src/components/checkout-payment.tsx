// TODO iframe checkout
"use client";
import { useState } from "react";
import axios from "axios";

const CheckoutPayment = () => {
  const [orderId, setOrderId] = useState("");
  const [iframeSrc, setIframeSrc] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/epdq", { orderId });
      const formData = response.data.params;

      const formInputs = Object.keys(formData)
        .map((key) => `<input type="hidden" name="${key}" value="${formData[key]}"/>`)
        .join("");

      const srcDoc = `
        <html>
          <body onload="document.forms[0].submit()">
            <form action="${process.env.EPDQ_URL}" method="post">
              ${formInputs}
            </form>
          </body>
        </html>`;

      setIframeSrc(`data:text/html;charset=utf-8,${encodeURIComponent(srcDoc)}`);
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Order ID</label>
          <input
            type="text"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
            title="Order ID"
          />
        </div>
        <button
          type="submit"
          title="Generate Token"
        >
          Generate Tokenization
        </button>
      </form>

      {iframeSrc && (
        <iframe
          src={iframeSrc}
          style={{ width: "100%", height: "600px", border: "none" }}
        />
      )}
    </div>
  );
};

export default CheckoutPayment;
