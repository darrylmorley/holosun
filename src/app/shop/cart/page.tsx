import CartItems from "@/components/cart-items";
import CartSummary from "@/components/cart-summary";

export default function CartPage() {
  return (
    <div>
      <div className="px-4 text-center flex flex-col justify-center items-center h-56 bg-secondary text-white space-y-4">
        <h1>Cart</h1>
        <p>Check your order here</p>
      </div>
      <div className="flex flex-col lg:flex-row px-4 my-8">
        <div className="lg:w-2/3">
          <CartItems />
        </div>
        <div className="lg:w-1/3 bg-stone-100">
          <CartSummary />
        </div>
      </div>
    </div>
  );
}
