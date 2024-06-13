import { config } from "../../../config/config";

export const formatEqpdqData = (totalPrice, userDetails, orderNo, preOrderItems) => {
  return {
    accepturl: config.acceptURL,
    amount: totalPrice,
    backurl: config.backURL,
    cancelurl: config.cancelURL,
    catalogurl: "https://www.shootingsuppliesltd.co.uk",
    cn: `${userDetails.firstName} ${userDetails.lastName}`,
    com: "shootingsuppliesltd",
    complus: JSON.stringify({ userDetails, preOrderItems }),
    currency: "GBP",
    declineurl: config.declineURL,
    email: userDetails.email,
    exceptionurl: "https://www.shootingsuppliesltd.co.uk/cart",
    homeurl: "https://www.shootingsuppliesltd.co.uk",
    language: "en_US",
    orderid: orderNo,
    owneraddress: userDetails.billingAddress1
      ? userDetails.billingAddress1
      : userDetails.shippingAddress1,
    ownertown: userDetails.billingCity ? userDetails.billingCity : userDetails.shippingCity,
    ownerzip: userDetails.billingPostcode
      ? userDetails.billingPostcode
      : userDetails.shippingPostcode,
    title: "shooting supplies ltd",
    tp: "shootingsupplies_payment_template.html",
  };
};

export default formatEqpdqData;
