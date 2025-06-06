import Link from "next/link";

import prisma from "@/lib/db/prisma";
import { formatCartItem } from "@/lib/utils/helpers";

import CartItems from "@/components/cart-items"
import CartSummary from "@/components/cart-summary"

async function getShippingItems() {
  return await prisma.product.findMany({
    where: {
      id: {
        in: [7476, 8403],
      },
    },
  });
}

export default async function CartPage() {
  const shippingItems = await getShippingItems();
  const stdDelivery = formatCartItem(shippingItems.find((item) => item.id === 7476));
  const NIDelivery = formatCartItem(shippingItems.find((item) => item.id === 8403));

  return (
    <div>
      <div className="px-4 text-center flex flex-col justify-center items-center h-56 bg-secondary text-white space-y-4">
        <h1>Cart</h1>
        <p>Check your order here</p>
      </div>
      <div className="px-12 my-4 text-sm breadcrumbs">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/shop">Shop</Link>
          </li>
          <li>
            <Link href={`/shop/cart`}>Cart</Link>
          </li>
        </ul>
      </div>
      <div className="flex flex-col lg:flex-row px-4 my-8">
        <div className="lg:w-2/3">
          <CartItems />
        </div>
        <div className="lg:w-1/3 mt-4 lg:mt-0 bg-stone-100">
          <CartSummary
            stdDelivery={stdDelivery}
            NIDelivery={NIDelivery}
          />
        </div>
      </div>
    </div>
  );
}
