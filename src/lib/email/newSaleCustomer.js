import { render } from "@react-email/render";

import { brevoApiInstance, sendSmtpEmail } from "@/lib/email/brevo-api";
import CustomerSaleEmail from "@/emails/new-sale-customer";
import { config } from "../../../config/config";

export async function newSaleCustomerEmail(orderID, lines, customer) {
  const data = { orderID, lines, customer };

  sendSmtpEmail.subject = "Your Holosun Optics Order";
  sendSmtpEmail.sender = { email: "noreply@holosun-optics.co.uk", name: "Holosun Optics" };
  sendSmtpEmail.to = config.emailTo;
  sendSmtpEmail.htmlContent = emailHtml;
  sendSmtpEmail.params = data;

  const emailHtml = render(<CustomerSaleEmail props={data} />);

  try {
    brevoApiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
      console.log("API called successfully. Returned data: " + JSON.stringify(data));
    });

    return { message: "Message sent successfully!", status: 200 };
  } catch (error) {
    console.error(error);
  }
}
