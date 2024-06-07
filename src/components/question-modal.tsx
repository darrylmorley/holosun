"use client";
import { CircleHelp } from "lucide-react";

export default function QuestionModal() {
  return (
    <>
      <span
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => document.getElementById("question-modal").showModal()}
      >
        {" "}
        <CircleHelp /> Ask A Question
      </span>

      <dialog
        id="question-modal"
        className="modal"
      >
        <div className="modal-box rounded-sm p-12 text-gray-900">
          <h3 className="font-bold text-2xl">Ask a question</h3>

          <form
            action=""
            className="flex flex-col gap-4 mt-6"
          >
            <div className="flex flex-col">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                required
                autoComplete="name"
                className="rounded-sm"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                className="rounded-sm"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                className="rounded-sm"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                className="rounded-sm"
              />
            </div>
            <button
              type="submit"
              className="btn bg-accent text-white rounded-sm"
            >
              Send
            </button>
          </form>
        </div>

        <form
          method="dialog"
          className="modal-backdrop"
        >
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
