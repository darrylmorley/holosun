export async function getPaymentURL({ amount, orderNumber, formData }) {
  // Validate input parameters
  if (!amount || !orderNumber || !formData) {
    console.error("Invalid input parameters");
    return null;
  }
  // Ensure amount is a number
  if (isNaN(amount)) {
    console.error("Amount must be a number");
    return null;
  }
  // Ensure orderNumber is a string
  if (typeof orderNumber !== "string") {
    console.error("Order number must be a string");
    return null;
  }
  // Ensure customerDetails is an object
  if (typeof formData !== "object" || formData === null) {
    console.error("Form data must be an object");
    return null;
  }

  try {
    const response = await fetch("/api/worldpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        orderNumber,
        formData,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Payment request failed:", errorData);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error during payment request: ${error.message}`);
    return null;
  }
}
