"use server";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function sendContactFormEmail(prevState: any, formData: FormData) {
  console.log(formData);

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
  });

  const dataObject: Record<string, any> = {};
  formData.forEach((value, key) => {
    dataObject[key] = value;
  });

  const data = schema.parse(dataObject);

  try {
    // Send email if data ok
    console.log(data);
    revalidatePath("/support/contact-us");
    return { message: "Message sent successfully!", status: 200 };
  } catch (e) {
    return { message: "Message sending failed, please try again.", status: 500 };
  }
}
