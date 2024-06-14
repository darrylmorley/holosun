"use server";
import { revalidatePath } from "next/cache";
import { render } from "@react-email/render";
import { SES } from "@aws-sdk/client-ses";
import z from "zod";

import ItemEnquiry from "@/emails/item-enquiry";
import ContactEmail from "../emails/contact-form-email";

const ses = new SES({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  region: "eu-west-2",
});

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

  const dataObject: Record<string, any> = {};
  formData.forEach((value, key) => {
    dataObject[key] = value;
  });

  const data = schema.parse(dataObject);

  const emailHtml = dataObject.itemName?.length
    ? render(ItemEnquiry(data))
    : render(ContactEmail(data));

  const params = {
    Source: "no-reply@holosun-optics.co.uk",
    Destination: {
      ToAddresses: ["darryl@holosun-optics.co.uk"],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: emailHtml,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "A Message From The Holosun Optics Contact Form",
      },
    },
  };

  try {
    revalidatePath("/support/contact-us");
    await ses.sendEmail(params);
    return { message: "Message sent successfully!", status: 200 };
  } catch (e) {
    return {
      message: "Message sending failed. Please try again later. Or call us on 01527 831 261.",
      status: 500,
    };
  }
}
