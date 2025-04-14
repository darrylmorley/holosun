import { render } from "@react-email/render";

import { brevoApiInstance } from "@/lib/email/brevo-api";
import OfficeSaleEmail from "@/emails/new-sale-office";
import { config } from "../../../config/config";

export async function newSaleOfficeEmail(orderID, lines, customer) {
  const data = { orderID, lines, customer };
  const emailHtml = render(<OfficeSaleEmail data={data} />);

  // Create a new email object each time instead of using the shared one
  const emailPayload = {
    subject: "New Holosun Optics Sale",
    sender: { email: "noreply@holosun-optics.co.uk", name: "Holosun Optics" },
    to: config.emailTo,
    htmlContent: emailHtml,
    params: data,
  };

  try {
    // Log the data being sent to help with debugging
    console.log("Sending office email with customer data:", JSON.stringify(customer));

    await brevoApiInstance.sendTransacEmail(emailPayload);
    console.log("Office email sent successfully");

    return { message: "Message sent successfully!", status: 200 };
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}
