import CheckoutForm from "@/components/checkout-form";
import CheckoutSummary from "@/components/checkout-summary";
import prisma from "@/lib/db/prisma";
import { formatCartItem } from "@/lib/helpers";

async function getShippingItems() {
  return await prisma.product.findMany({
    where: {
      id: {
        in: [7476, 8403],
      },
    },
  });
}

export default async function Checkout() {
  const shippingItems = await getShippingItems();
  const stdDelivery = formatCartItem(shippingItems.find((item) => item.id === 7476));
  const NIDelivery = formatCartItem(shippingItems.find((item) => item.id === 8403));

  return (
    <div>
      <h1 className="sr-only">Checkout Page</h1>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <div className="h-full w-full lg:pl-56 px-4 lg:px-8 order-last lg:order-first">
          <CheckoutForm
            stdDelivery={stdDelivery}
            NIDelivery={NIDelivery}
          />
        </div>
        <div className="h-full w-full bg-stone-100 p-4 lg:p-8 lg:pr-56">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
}
