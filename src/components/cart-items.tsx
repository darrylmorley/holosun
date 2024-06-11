"use client";
import { getFormattedPrice } from "@/lib/helpers";
import Image from "next/image";
import { useCart } from "react-use-cart";

export default function CartItems() {
  const { items, removeItem, isEmpty, updateItemQuantity, cartTotal } = useCart();

  const handleAddItem = (e, item) => {
    e.preventDefault();
    if (item.quantity < item.qoh) updateItemQuantity(item.id, item.quantity + 1);
  };

  const handleRemoveItem = (e, item) => {
    e.preventDefault();
    if (item.quantity > 1) updateItemQuantity(item.id, item.quantity - 1);
  };

  return (
    <div className="overflow-x-auto px-4">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {/* rows */}
          {items.map((item) => (
            <tr key={item.id}>
              <td className="flex items-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                />
                <div className="space-y-2 ml-2">
                  <p>{item.name}</p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="font-bold"
                  >
                    Remove
                  </button>
                </div>
              </td>
              <td>{getFormattedPrice(item.price)}</td>
              <td>
                <form className="join">
                  <button
                    className="w-8 h-8 bg-stone-100 join-item"
                    onClick={(e) => handleRemoveItem(e, item)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    id="quantity"
                    type="number"
                    className="text-xs flex w-12 text-left h-8 items-center border-stone-100 bg-white text-gray-700 outline-none hover:text-black focus:text-black focus:outline-none"
                    value={item.quantity}
                    max={item.qoh}
                    disabled
                  />
                  <button
                    className="w-8 h-8 bg-stone-100 join-item"
                    onClick={(e) => handleAddItem(e, item)}
                    disabled={item.quantity >= item.qoh}
                  >
                    +
                  </button>
                </form>
              </td>
              <td>{getFormattedPrice(item.price * item.quantity)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
