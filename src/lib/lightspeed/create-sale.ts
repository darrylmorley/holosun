export const createLightspeedSale = async (items, customerID) => {
  const SHOP_ID = 1;
  const EMPLOYEE_ID = 10;
  const REGISTER_ID = 2;
  const TAX_CLASS_ID = 1;

  const formatSale = (items, customerID) => {
    const formatPrice = (price) => price.replace("£", "").replace(",", "");

    const saleLines = items.map((item) => ({
      SaleLine: {
        shopID: SHOP_ID,
        employeeID: EMPLOYEE_ID,
        customSku: item.sku,
        unitQuantity: item.quantity,
        unitPrice: formatPrice(item.price),
        itemID: parseInt(item.id),
        taxClassID: TAX_CLASS_ID,
      },
    }));

    return {
      employeeID: EMPLOYEE_ID,
      registerID: REGISTER_ID,
      customerID,
      completed: false,
      shopID: SHOP_ID,
      SaleLines: saleLines,
    };
  };

  const lsSaleObject = formatSale(items, customerID);

  try {
    const response = await fetch("/api/postsale", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lsSaleObject),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const createdSale = await response.json();
    return createdSale;
  } catch (error) {
    console.error("Failed to create Lightspeed sale:", error);
    throw error; // Re-throw the error after logging it
  }
};
