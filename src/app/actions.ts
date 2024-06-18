"use server";
import { revalidatePath } from "next/cache";
import { render } from "@react-email/render";
import z from "zod";

import { brevoApiInstance, sendSmtpEmail } from "@/lib/email/brevo-api";

import ContactEmail from "@/emails/contact-form-email";
import ItemEnquiry from "@/emails/item-enquiry";
import { config } from "../../config/config";

export async function sendContactFormEmail(prevState: any, formData: FormData) {
  const schema = z.object({
    name: z.string().min(1, "Name is required").max(80, "Name is too long"),
    email: z.string().email("Invalid email address").max(80, "Email is too long"),
    tel: z
      .string()
      .optional()
      .refine((value) => !value || /^\d{10,}$/.test(value), {
        message: "Phone number must be at least 10 digits and contain only numbers",
      }),
    message: z.string().min(1, "Message is required"),
    itemId: z.string().optional(),
    itemName: z.string().optional(),
  });

  const dataObject: Record<string, FormDataEntryValue> = {};
  formData.forEach((value: FormDataEntryValue, key) => {
    dataObject[key] = value;
  });

  const data = schema.parse(dataObject);

  const emailHtml =
    typeof dataObject.itemName === "string" && dataObject.itemName.length
      ? render(ItemEnquiry(data))
      : render(ContactEmail(data));

  sendSmtpEmail.subject = "Holosun Website Contact Form Submission";
  sendSmtpEmail.sender = { email: "noreply@holosun-optics.co.uk", name: "Holosun Optics" };
  sendSmtpEmail.to = config.emailTo;
  sendSmtpEmail.htmlContent = emailHtml;
  sendSmtpEmail.params = data;

  try {
    revalidatePath("/support/contact-us");

    brevoApiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
      console.log("API called successfully. Returned data: " + JSON.stringify(data));
    });

    return { message: "Message sent successfully!", status: 200 };
  } catch (e) {
    return {
      message: "Message sending failed. Please try again later. Or call us on 01527 831 261.",
      status: 500,
    };
  }
}
