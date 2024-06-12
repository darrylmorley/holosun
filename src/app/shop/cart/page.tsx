import dynamic from "next/dynamic";
import Link from "next/link";

const CartItems = dynamic(() => import("@/components/cart-items"), { ssr: false });
const CartSummary = dynamic(() => import("@/components/cart-summary"), { ssr: false });

export default function CartPage() {
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
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
