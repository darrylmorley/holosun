"use client";
import { CircleHelp } from "lucide-react";
import QuestionForm from "./question-form";

export default function QuestionModal({ item }) {
  const itemName = item.name;
  const itemId = item.id;

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
          <QuestionForm
            itemId={itemId}
            itemName={itemName}
          />
        </div>

        <form
          method="dialog"
          className="modal-backdrop"
        >
          <button
            title="Close Form"
            type="button"
          >
            close
          </button>
        </form>
      </dialog>
    </>
  );
}
