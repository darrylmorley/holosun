import { useActionState } from "react";
"use client";
import { useFormStatus } from "react-dom";
import { MailCheck, MailWarning } from "lucide-react";

import { sendContactFormEmail } from "@/app/actions";

const initialFormState = {
  name: "",
  email: "",
  tel: "",
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="self-end px-6 py-3 font-bold text-white rounded-sm w-36 bg-accent hover:ring-2 hover:ring-offset-2 active:bg-secondary active:ring-secondary"
      // aria-disabled={pending}
      data-umami-event="contact-form"
      title="Send"
    >
      {pending ? <span className="loading loading-spinner"></span> : "Send"}
    </button>
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(sendContactFormEmail, initialFormState);

  if (state.status === 200) {
    return (
      <div className="min-h-[500px] flex flex-col justify-center items-center px-4 py-8 space-y-8 border lg:p-12 lg:w-2/3 border-secondary lg:shadow-lg text-secondary">
        <p className="flex flex-row items-center gap-2 text-xl">
          <span>
            {" "}
            <MailCheck className="text-green-500" />
          </span>{" "}
          {state.message}
        </p>
      </div>
    );
  }

  if (state.status === 500) {
    return (
      <div className="min-h-[500px] flex flex-col justify-center px-4 py-8 space-y-8 border lg:p-12 lg:w-2/3 border-secondary lg:shadow-lg text-secondary">
        <p className="flex flex-row items-center gap-2 text-xl">
          <span>
            {" "}
            <MailWarning className="text-red-500" />
          </span>{" "}
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col px-4 py-8 space-y-8 border lg:p-12 lg:w-2/3 border-secondary lg:shadow-lg text-secondary">
      <h2 className="text-2xl font-bold">Get in touch</h2>
      <form
        id="contact-form"
        name="contact"
        className="min-h-[500px] flex flex-col space-y-8 lg:space-y-8"
        action={formAction}
      >
        <div className="flex flex-col space-y-4 lg:flex-row lg:space-x-8 lg:space-y-0 ">
          <div className="w-2/3 flex flex-col space-y-1">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="p-2 border-2 rounded-sm border-secondary"
            />
          </div>
        </div>
        <div className="w-2/3 flex flex-col space-y-4 lg:flex-row lg:space-x-8 lg:space-y-0">
          <div className="w-1/2 flex flex-col space-y-1">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="p-2 border-2 rounded-sm border-secondary"
            />
          </div>
          <div className="w-1/2 flex flex-col space-y-1">
            <label htmlFor="name">Phone (Optional)</label>
            <input
              type="tel"
              name="tel"
              id="tel"
              className="p-2 border-2 rounded-sm border-secondary"
            />
          </div>
        </div>
        <div className="space-y-1">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            required
            className="relative w-full h-48 p-2 border-2 rounded-sm border-secondary"
          />
        </div>
        <SubmitButton />
      </form>
    </div>
  );
}
