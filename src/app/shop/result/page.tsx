import { config } from "../../../../config/config";

import { cancelSale, completeSale, getSale } from "@/lib/lightspeed/lightspeed";
import { newSaleCustomerEmail } from "@/lib/email/newSaleCustomer";
import { newSaleOfficeEmail } from "@/lib/email/newSaleOffice";

import ResultDetail from "@/components/result-detail";

export const metadata = {
  title: "Your Cart",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function Page({ searchParams }) {
  const { orderID, amount, accept, STATUS, COMPLUS } = searchParams;
  const contactDetails = JSON.parse(COMPLUS);
  let sale;
  let lines = [];

  if (accept === "true" && STATUS === "9") {
    // In  production, if card payment is successful, get the sale from epos. Else, use the orderID in dev.
    if (config.env === "production") {
      sale = await getSale(orderID);

      if (Array.isArray(sale.Sale.SaleLines.SaleLine)) {
        lines = sale.Sale.SaleLines.SaleLine.map((line) => {
          console.log(line);

          return {
            id: line.itemID,
            sku: line.Item.customSku,
            description: line.Item.description,
            qty: line.unitQuantity,
          };
        });
      } else
        lines = [
          {
            id: sale.Sale.SaleLines.SaleLine.itemID,
            sku: sale.Sale.SaleLines.SaleLine.Item.customSku,
            description: sale.Sale.SaleLines.SaleLine.Item.description,
            qty: sale.Sale.SaleLines.SaleLine.unitQuantity,
          },
        ];

      if (sale.Sale.completed != "true") {
        // complete the sale on the epos
        completeSale(orderID, amount);
      }

      if (accept === "cancelled" && accept != "9") {
        // If card payment is cancelled, cancel the sale on epos
        cancelSale(orderID);
      }
    } else sale = orderID;

    // Send confirmation emails
    newSaleCustomerEmail(orderID, lines, contactDetails.userDetails);
    newSaleOfficeEmail(orderID, lines, contactDetails.userDetails);
  }

  return (
    <>
      <div className="px-4 text-center flex flex-col justify-center items-center h-56 bg-secondary text-white space-y-4">
        <h1 className="text-4xl lg:text-5xl font-black uppercase">Result</h1>
        <p className="text-lg text-center">Your checkout result.</p>
      </div>
      <ResultDetail
        params={searchParams}
        lsSale={orderID}
      />
    </>
  );
}
