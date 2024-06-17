import { config } from "../../../config";
import { render } from "@react-email/render";
import { brevoApiInstance, sendSmtpEmail } from "@/lib/email/brevo-api";

export async function newSaleOfficeEmail(orderID, lines, customer) {
  const data = { orderID, lines, customer };

  sendSmtpEmail.subject = "New Holosun Optics Sale";
  sendSmtpEmail.sender = { email: "noreply@holosun-optics.co.uk", name: "Holosun Optics" };
  sendSmtpEmail.to = config.emailTo;
  sendSmtpEmail.htmlContent = emailHtml;
  sendSmtpEmail.params = data;

  try {
    brevoApiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
      console.log("API called successfully. Returned data: " + JSON.stringify(data));
    });

    return { message: "Message sent successfully!", status: 200 };
  } catch (error) {
    console.error(error);
  }
}
