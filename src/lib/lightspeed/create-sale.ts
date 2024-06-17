"use server";
import { createSale } from "./lightspeed";

export const createLightspeedSale = async (cartItems) => {
  const formatSale = (cartItems) => {
    const saleLines = cartItems.map((item) => {
      return {
        SaleLine: [
          {
            shopID: 1,
            employeeID: 13,
            customSku: item.sku,
            unitQuantity: item.quantity,
            unitPrice: item.price,
            itemID: item.id,
          },
        ],
      };
    });

    const sale = {
      employeeID: 13,
      registerID: 2,
      completed: false,
      shopID: 1,
      SaleLines: saleLines.map((item) => {
        return item;
      }),
    };

    return sale;
  };

  const lsSaleObject = formatSale(cartItems);

  try {
    const sale = await createSale(lsSaleObject);
    console.log("Sale created in createLightspeedSale: ", sale);
    return sale;
  } catch (error) {
    console.error(error);
  }
};
