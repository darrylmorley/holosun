"use server";
import { revalidatePath } from "next/cache";
import { render } from "@react-email/render";
import z from "zod";

import {
  brevoApiInstance,
  sendSmtpEmail,
  brevoContactsInstance,
  createContact,
} from "@/lib/email/brevo-api";

import ContactEmail from "@/emails/contact-form-email";
import ItemEnquiry from "@/emails/item-enquiry";
import { config } from "../../config/config";
import NewsletterSignup from "@/emails/newsletter-signup";

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

    const sendEmail = await brevoApiInstance.sendTransacEmail(sendSmtpEmail).then(function () {
      console.log("API called successfully.");
    });

    return { message: "Message sent successfully!", status: 200, data: JSON.stringify(sendEmail) };
  } catch (e) {
    return {
      message: "Message sending failed. Please try again later. Or call us on 01527 831 261.",
      status: 500,
    };
  }
}

export async function newsletterSignup(prevState: any, formData: FormData) {
  const schema = z.object({
    email: z.string().email("Invalid email address").max(80, "Email is too long"),
  });

  const dataObject: Record<string, FormDataEntryValue> = {};
  formData.forEach((value: FormDataEntryValue, key) => {
    dataObject[key] = value;
  });

  const data = schema.parse(dataObject);

  const addContactToList = async (email: string) => {
    createContact.email = email;
    createContact.listIds = [6];

    return await brevoContactsInstance.createContact(createContact);
  };

  const sendSignupConfirmation = async (email: string) => {
    const emailHtml = render(NewsletterSignup());

    sendSmtpEmail.subject = "Holosun Website Contact Form Submission";
    sendSmtpEmail.sender = { email: "noreply@holosun-optics.co.uk", name: "Holosun Optics" };
    sendSmtpEmail.to = [{ email: email }];
    sendSmtpEmail.htmlContent = emailHtml;
    sendSmtpEmail.params = data;

    return await brevoApiInstance.sendTransacEmail(sendSmtpEmail);
  };

  try {
    revalidatePath("/");
    await addContactToList(data.email);
    await sendSignupConfirmation(data.email);

    console.log({
      message: "Newsletter signup successfull!",
      status: 200,
    });
    return {
      message: "Newsletter signup successfull!",
      status: 200,
    };
  } catch (e) {
    console.log({
      message: e.body.message,
      status: e.statusCode,
    });
    return {
      message: e.body.message,
      status: e.statusCode,
    };
  }
}

export async function search(prevState: any, formData: FormData) {
  const schema = z.object({
    search: z.string().min(1, "Search term is required").max(80, "Search term is too long"),
  });

  const dataObject: Record<string, FormDataEntryValue> = {};
  formData.forEach((value: FormDataEntryValue, key) => {
    dataObject[key] = value;
  });

  const data = schema.parse(dataObject);

  console.log(data);

  try {
    revalidatePath("/shop/search");

    return {
      message: "Search Successfull!",
      status: 200,
      data: JSON.stringify(data),
    };
  } catch (e) {
    return {
      message: "Search failed. Please try again later.",
      status: 500,
    };
  }
}
