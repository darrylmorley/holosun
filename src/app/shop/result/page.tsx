import { cookies } from "next/headers";

import { cancelSale, completeSale, getSale } from "@/lib/lightspeed/lightspeed";
import { newSaleCustomerEmail } from "@/lib/email/newSaleCustomer";
import { newSaleOfficeEmail } from "@/lib/email/newSaleOffice";

import ResultDetail from "@/components/result-detail";
import ClearCookies from "@/components/clear-cookies";

export const metadata = {
  title: "Your Cart",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function Page({ searchParams }) {
  const params = await searchParams;
  let accept = params?.accept || "cancelled";

  if (!["success", "declined", "exception", "cancelled"].includes(accept)) {
    accept = "cancelled";
  }

  const cookieStore = await cookies();
  const orderID = cookieStore.get("orderID")?.value;
  const formData = JSON.parse(
    cookieStore.get("formData")?.value || "{}",
  );

  const customerDetails = {
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: formData.email,
    tel: formData.tel,
    deliveryAddress1: formData.deliveryAddress1 || formData.billingAddress1,
    deliveryAddress2: formData.deliveryAddress2 || formData.billingAddress2,
    deliveryCity: formData.deliveryCity || formData.billingCity,
    deliveryPostcode: formData.deliveryPostcode || formData.billingPostcode,
  }

  if (accept === "declined" || accept === "exception" || accept === "cancelled") {
    // Handle declined or exception case
    console.log("Payment was declined, cancelled or an exception occurred.");
    if (orderID) {
      await cancelSale(orderID);
      console.log("Sale cancelled:", orderID);
    }
  }

  if (accept === "success" && orderID) {
    const sale = await getSale(orderID);
    console.log(
      `Retrieved sale data for order ${orderID}, completed status: ${sale.Sale.completed}`,
    );

    const amount = sale.Sale.totalDue;

    let lines;

    if (Array.isArray(sale.Sale.SaleLines.SaleLine)) {
      lines = sale.Sale.SaleLines.SaleLine.map((line) => {
        return {
          sku: line.Item.customSku,
          description: line.Item.description,
          qty: line.unitQuantity,
        };
      });
    } else
      lines = [
        {
          sku: sale.Sale.SaleLines.SaleLine.Item.customSku,
          description: sale.Sale.SaleLines.SaleLine.Item.description,
          qty: sale.Sale.SaleLines.SaleLine.unitQuantity,
        },
      ];

    // Check if the sale is already completed
    if (sale.Sale.completed != "true") {
      try {
        const completedSale = await completeSale(orderID, amount);
        console.log("Sale completed:", completedSale.Sale.saleID);

        // Send emails to customer and office
        try {
          await newSaleCustomerEmail(orderID, lines, customerDetails);
        } catch (error) {
          console.error("Failed to send customer email:", error);
        }

        try {
          await newSaleOfficeEmail(orderID, lines, customerDetails);
        } catch (error) {
          console.error("Failed to send office email:", error);
        }
      } catch (error) {
        if (error.response) {
          // Server responded with a non-2xx status
          console.error("Lightspeed error:", {
            status: error.response.status,
            statusText: error.response.statusText,
            data: error.response.data, // includes httpCode, message, etc.
          });
        } else if (error.request) {
          // Request was made but no response received
          console.error("No response received from Lightspeed:", error.request);
        } else {
          // Other errors (e.g. bad config)
          console.error(
            "Error setting up request to Lightspeed:",
            error.message,
          );
        }
      }

    }
  }

  return (
    <>
      <div className="px-4 text-center flex flex-col justify-center items-center h-56 bg-secondary text-white space-y-4">
        <h1 className="text-4xl lg:text-5xl font-black uppercase">Result</h1>
        <p className="text-lg text-center">Your checkout result.</p>
      </div>
      <ResultDetail params={params} lsSale={orderID} />
      <ClearCookies />
    </>
  );
}
