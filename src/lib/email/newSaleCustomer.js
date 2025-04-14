import { render } from "@react-email/render";

import { brevoApiInstance } from "@/lib/email/brevo-api";
import CustomerSaleEmail from "@/emails/new-sale-customer";

export async function newSaleCustomerEmail(orderID, lines, customer) {
  const data = { orderID, lines, customer };
  const emailHtml = render(<CustomerSaleEmail data={data} />);

  const emailPayload = {
    subject: "Holosun Optics UK Order Confirmation",
    sender: { email: "noreply@holosun-optics.co.uk", name: "Holosun Optics" },
    to: [{ email: customer.email, name: `${customer.firstName} ${customer.lastName}` }],
    htmlContent: emailHtml,
    params: data,
  };

  try {
    console.log("Sending customer email with data:", JSON.stringify(customer));
    await brevoApiInstance.sendTransacEmail(emailPayload);
    console.log("Customer email sent successfully");

    return { message: "Message sent successfully!", status: 200 };
  } catch (error) {
    console.error("Failed to send customer email:", error);
    throw error;
  }
}
