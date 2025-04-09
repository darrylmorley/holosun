import { config } from "../../../../config/config";

export default async function handler(req, res) {
  const WORLDPAY_URL = config.worldPayURL;
  const WORLDPAY_ENTITY = config.worldpayEntity;
  const WORLDPAY_USER = config.worldpayUser;
  const WORLDPAY_PASSWORD = config.worldpayPassword;

  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { amount, orderNumber, formData } = req.body;

    const paymentRequest = {
      transactionReference: orderNumber,
      merchant: {
        entity: WORLDPAY_ENTITY,
      },
      narrative: {
        line1: "FAB Defense UK",
      },
      value: {
        currency: "GBP",
        amount: amount,
      },
      billingAddress: {
        address1: formData.billingAddress.line_1,
        address2: formData.billingAddress.line_2,
        city: formData.billingAddress.post_town,
        state: formData.billingAddress.county,
        postalCode: formData.billingAddress.postcode,
        countryCode: "GB",
      },
      riskData: {
        shipping: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: {
            address1: formData.deliveryAddress?.line_1 || formData.billingAddress.line_1,
            address2: formData.deliveryAddress?.line_2 || formData.billingAddress.line_2,
            city: formData.deliveryAddress?.post_town || formData.billingAddress.post_town,
            state: formData.deliveryAddress?.county || formData.billingAddress.county,
            postalCode: formData.deliveryAddress?.postcode || formData.billingAddress.postcode,
            phoneNumber: formData.tel || "",
            countryCode: "GB",
          },
        },
      },
    };

    // Create auth header for WorldPay API
    const base64CredentialsString = Buffer.from(`${WORLDPAY_USER}:${WORLDPAY_PASSWORD}`).toString(
      "base64"
    );
    const authHeader = `Basic ${base64CredentialsString}`;

    console.log("Sending request to WorldPay:", {
      url: WORLDPAY_URL,
      transactionReference: orderNumber,
    });

    const response = await fetch(WORLDPAY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/vnd.worldpay.payment_pages-v1.hal+json",
        "User-Agent": "string",
        Authorization: authHeader,
      },
      body: JSON.stringify(paymentRequest),
    });

    // Handle response
    if (!response.ok) {
      const errorText = await response.text();
      console.error("WorldPay API error:", {
        status: response.status,
        response: errorText,
      });
      return res.status(response.status).json({
        error: `WorldPay API error: ${response.status}`,
        details: errorText,
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Payment process error:", error);
    return res.status(500).json({ error: error.message });
  }
}
