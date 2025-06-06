"use client";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { MailCheck, MailWarning } from "lucide-react";

import { newsletterSignup } from "@/app/(website)/actions";

const initialFormState = {
  email: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="btn btn-md join-item btn-secondary hover:btn-accent hover:text-white text-white"
      // aria-disabled={pending}
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
      <h6 className="footer-title">Newsletter</h6>
      <fieldset className="form-control w-80">
        <label
          className="label"
          htmlFor="email"
        >
          <span className="label-text">Enter your email address</span>
        </label>
        <div className="join">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="username@site.com"
            autoComplete="email"
            required
            className="input input-bordered input-md join-item"
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
