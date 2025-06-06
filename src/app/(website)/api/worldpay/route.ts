import { NextRequest, NextResponse } from "next/server";
import { config } from "../../../../../config/config";

export async function POST(request: NextRequest) {
  const WORLDPAY_URL = config.worldPayURL;
  const WORLDPAY_ENTITY = config.worldpayEntity;
  const WORLDPAY_USER = config.worldpayUser;
  const WORLDPAY_PASSWORD = config.worldpayPassword;

  try {
    const body = await request.json();
    const { amount, orderNumber, formData } = body;

    const paymentRequest = {
      transactionReference: orderNumber,
      merchant: {
        entity: WORLDPAY_ENTITY,
      },
      narrative: {
        line1: "Holosun UK",
      },
      value: {
        currency: "GBP",
        amount: amount,
      },
      billingAddress: {
        address1: formData.billingAddress1,
        address2: formData.billingAddress2,
        city: formData.billingCity,
        state: formData.billingCounty,
        postalCode: formData.billingPostcode,
        countryCode: "GB",
      },
      riskData: {
        shipping: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: {
            address1: formData.deliveryAddress1 || formData.billingAddress1,
            address2: formData.deliveryAddress2 || formData.billingAddress2,
            city: formData.deliveryCity || formData.billingCity,
            state: formData.deliveryCounty || formData.billingCounty,
            postalCode: formData.deliveryPostcode || formData.billingPostcode,
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
      console.error("Worldpay error raw response:", errorText);
      console.error("WorldPay API error:", {
        status: response.status,
        response: errorText,
      });
      return NextResponse.json(
        { error: `WorldPay API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log("WorldPay API response:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Payment process error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function PATCH() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function HEAD() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

export async function OPTIONS() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
