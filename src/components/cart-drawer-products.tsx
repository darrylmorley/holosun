import Image from "next/image";

export default function CartDrawerProducts({ products, updateItemQuantity, removeItem }) {
  const handleAddItem = (e, item) => {
    console.log(item);
    e.preventDefault();
    if (item.quantity < item.qoh) updateItemQuantity(item.id, item.quantity + 1);
  };

  const handleRemoveItem = (e, item) => {
    e.preventDefault();
    if (item.quantity > 1) updateItemQuantity(item.id, item.quantity - 1);
  };

  return (
    <>
      {products
        ? products.map((item) => {
            console.log(item);
            return (
              <>
                <li
                  key={item.id}
                  className="flex"
                >
                  <picture className="relative min-w-20 min-h-20 mr-2 bg-stone-300">
                    <Image
                      src={item.image}
                      layout="fill"
                      objectFit="contain"
                      alt={item.name}
                    />
                  </picture>
                  <div className="flex flex-col gap-1 items-start text-sm">
                    <p>{item.name}</p>
                    <p>
                      {new Intl.NumberFormat("en-GB", {
                        style: "currency",
                        currency: "gbp",
                      }).format(item.price)}
                    </p>

                    <div className="flex items-center gap-8">
                      <form className="join">
                        <button
                          className="w-6 h-6 bg-stone-100 join-item"
                          onClick={(e) => handleRemoveItem(e, item)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="text-xs flex w-12 text-left h-6 items-center border-stone-100 bg-white text-gray-700 outline-none hover:text-black focus:text-black focus:outline-none"
                          value={item.quantity}
                          max={item.qoh}
                          disabled
                        />
                        <button
                          className="w-6 h-6 bg-stone-100 join-item"
                          onClick={(e) => handleAddItem(e, item)}
                          disabled={item.quantity >= item.qoh}
                        >
                          +
                        </button>
                      </form>
                      <p
                        onClick={() => removeItem(item.id)}
                        className="text-xs font-bold hover:text-accent cursor-pointer"
                      >
                        Remove
                      </p>
                    </div>
                  </div>
                </li>
                <div className="divider" />
              </>
            );
          })
        : null}
    </>
  );
}
