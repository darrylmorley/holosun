import ResultDetail from "@/components/result-detail";
import { cancelSale, completeSale, getSale } from "@/lib/lightspeed/lightspeed";

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

  if (accept === "true" && STATUS === "9") {
    const sale = await getSale(orderID);

    let lines;
    const contactDetails = JSON.parse(COMPLUS);

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

    if (sale.Sale.completed != "true") {
      // complete the sale on epos
      completeSale(orderID, amount);

      // Send confirmation emails
      // newSaleOffice(orderID, lines, contactDetails.userDetails);
      // newSaleCustomer(orderID, lines, contactDetails.userDetails);
    }
  }

  if (accept === "cancelled" && accept != "9") {
    // If card payment is cancelled, cancel the sale on epos
    cancelSale(orderID);
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
