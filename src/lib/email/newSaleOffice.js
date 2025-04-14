import { render } from "@react-email/render";

import { brevoApiInstance, sendSmtpEmail } from "@/lib/email/brevo-api";
import OfficeSaleEmail from "@/emails/new-sale-office";
import { config } from "../../../config/config";

export async function newSaleOfficeEmail(orderID, lines, customer) {
  const data = { orderID, lines, customer };
  const emailHtml = render(<OfficeSaleEmail data={data} />);

  sendSmtpEmail.subject = "New Holosun Optics Sale";
  sendSmtpEmail.sender = { email: "noreply@holosun-optics.co.uk", name: "Holosun Optics" };
  sendSmtpEmail.to = config.emailTo;
  sendSmtpEmail.htmlContent = emailHtml;
  sendSmtpEmail.params = data;

  try {
    const response = await brevoApiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("API called successfully. Returned data: " + JSON.stringify(response));

    return { message: "Message sent successfully!", status: 200 };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { message: "Failed to send email", status: 500 };
  }
}
