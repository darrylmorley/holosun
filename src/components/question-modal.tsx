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
            <div
              id="name"
              className="flex flex-col"
            >
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="rounded-sm"
              />
            </div>
            <div
              id="email"
              className="flex flex-col"
            >
              <label htmlFor="name">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="rounded-sm"
              />
            </div>
            <div
              id="phone"
              className="flex flex-col"
            >
              <label htmlFor="name">Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                className="rounded-sm"
              />
            </div>
            <div
              id="message"
              className="flex flex-col"
            >
              <label htmlFor="name">Message</label>
              <textarea
                name="message"
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
