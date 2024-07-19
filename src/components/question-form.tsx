"use client";
import { useFormState, useFormStatus } from "react-dom";
import { MailCheck, MailWarning } from "lucide-react";

import { sendContactFormEmail } from "@/app/actions";
import { closeModal } from "@/lib/utils/helpers";

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
      data-umami-event="item-contact-form"
      title="Submit Checkout Details"
    >
      {pending ? <span className="loading loading-spinner"></span> : "Send"}
    </button>
  );
}

export default function QuestionForm({ itemId, itemName }) {
  const [state, formAction] = useFormState(sendContactFormEmail, initialFormState);

  if (state.status === 200) {
    return (
      <div className="mt-8 space-y-12 transition ease-in-out">
        <p className="flex flex-row gap-2 text-xl">
          <span>
            {" "}
            <MailCheck className="text-green-500" />
          </span>{" "}
          {state.message}
        </p>
        <button
          onClick={() => closeModal("question-modal")}
          className="btn w-32 bg-accent text-white"
          type="button"
          title="Close Form"
        >
          Close
        </button>
      </div>
    );
  }

  if (state.status === 500) {
    return (
      <div className="mt-8 space-y-12 transition ease-in-out">
        <p className="flex flex-row gap-4 text-xl">
          <span>
            {" "}
            <MailWarning className="text-red-500" />
          </span>{" "}
          {state.message}
        </p>
        <button
          onClick={() => closeModal("question-modal")}
          className="btn w-32 bg-accent text-white"
          title="Close Form"
          type="button"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 mt-6"
    >
      <div className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          autoComplete="name"
          className="p-2 border rounded-sm border-secondary"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="p-2 border rounded-sm border-secondary"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="tel">Phone</label>
        <input
          id="tel"
          name="tel"
          type="tel"
          autoComplete="tel"
          className="p-2 border rounded-sm border-secondary"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          className="p-2 border rounded-sm border-secondary"
        />
      </div>
      <div className="hidden">
        <input
          id="itemName"
          name="itemName"
          type="text"
          value={itemName}
          readOnly
          title="Item Name"
        />
        <input
          id="itemId"
          name="itemId"
          type="number"
          value={itemId}
          readOnly
          title="Item ID"
        />
      </div>
      <SubmitButton />
    </form>
  );
}
