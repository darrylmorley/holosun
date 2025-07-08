"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { MailCheck, MailWarning } from "lucide-react";

import { newsletterSignup } from "@/app/actions";

const initialFormState = {
  email: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn btn-md join-item btn-secondary hover:btn-accent hover:text-white text-white"
      data-umami-event="email-signup"
      title="Send"
    >
      {pending ? <span className="loading loading-spinner"></span> : "Send"}
    </button>
  );
}

export default function NewsletterForm() {
  const [state, formAction] = useActionState(newsletterSignup, initialFormState);

  return (
    <form action={formAction}>
      <fieldset className="form-control w-full max-w-md">
        <div className="join w-full">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="username@site.com"
            autoComplete="email"
            required
            className="input input-bordered input-md join-item flex-1"
          />
          {!state.status && <SubmitButton />}
          {state.status === 200 && (
            <MailCheck
              size={32}
              className="text-green-500 self-center ml-4"
            />
          )}
          {state.status === 500 ||
            (state.status === 400 && (
              <div className="flex flex-col items-start">
                <MailWarning
                  size={32}
                  className="text-red-500 ml-4"
                />
                <p className="text-red-500 self-center ml-4 mt-1">
                  {state.message === "Contact already exist" && <p>Already registered!</p>}
                </p>
              </div>
            ))}
        </div>
      </fieldset>
    </form>
  );
}