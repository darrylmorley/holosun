"use client";
import { Mail, Phone, Truck } from "lucide-react";

export default function DeliveryModal() {
  return (
    <>
      <span
        className="flex items-center gap-2"
        onClick={() => document.getElementById("delivery-modal").showModal()}
      >
        {" "}
        <Truck /> Delivery & Returns
      </span>

      <dialog
        id="delivery-modal"
        className="modal"
      >
        <div className="modal-box p-12 text-gray-900">
          <h3 className="font-bold text-2xl">Delivery & Returns</h3>

          <div className="mt-6 flex flex-col gap-4">
            <div>
              <h4>Delivery</h4>
              <ul className="mt-2 space-y-1">
                <li>All orders shipped with Parcel Force.</li>
                <li>
                  Orders are shipped Tue - Fri. Please expect a short delay on your delivery if
                  placing an order over the weekend as we are closed on a Monday.
                </li>
              </ul>
            </div>

            <div>
              <h4>Returns</h4>
              <ul className="mt-2 space-y-1">
                <li>
                  Items returned within 14 days of their original shipment date, in same as new
                  condition, will be eligible for a full refund or store credit.
                </li>
                <li>
                  Refunds will be charged back to the original form of payment used for purchase.
                </li>
                <li>
                  Customer is responsible for shipping charges when making returns.
                  Shipping/handling fees of original purchase are non-refundable.
                </li>
                <li>All sale items are final purchases.</li>
              </ul>
            </div>

            <div>
              <h4>Help</h4>
              <p className="mt-2 space-y-1">
                Get in touch if you have any other questions and/or concerns.{" "}
              </p>
              <ul className="mt-4 flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <Mail size={16} /> info@holosun-optics.co.uk
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} /> 01527831261
                </li>
              </ul>
            </div>
          </div>
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
