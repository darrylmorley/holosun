import { formatCartItem } from "@/lib/utils/helpers";
import prisma from "@/lib/db/prisma";

import CheckoutFull from "@/components/checkout-full";

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
    <CheckoutFull
      stdDelivery={stdDelivery}
      NIDelivery={NIDelivery}
    />
  );
}
