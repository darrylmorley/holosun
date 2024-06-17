import { config } from "../../../config/config";

export const formatEqpdqData = (totalPrice, userDetails, orderNo) => {
  return JSON.stringify({
    accepturl: config.acceptURL,
    amount: Number(totalPrice),
    backurl: config.backURL,
    cancelurl: config.cancelURL,
    catalogurl: "https://www.holosun-optics.co.uk",
    cn: `${userDetails.firstName} ${userDetails.lastName}`,
    com: "holosun-optics",
    complus: JSON.stringify({ userDetails }),
    currency: "GBP",
    declineurl: config.declineURL,
    email: userDetails.email,
    exceptionurl: "https://www.holosun-optics.co.uk/cart",
    homeurl: "https://www.holosun-optics.co.uk",
    language: "en_US",
    orderid: orderNo,
    owneraddress: userDetails.billingAddress1
      ? userDetails.billingAddress1
      : userDetails.shippingAddress1,
    ownertown: userDetails.billingCity ? userDetails.billingCity : userDetails.shippingCity,
    ownerzip: userDetails.billingPostcode
      ? userDetails.billingPostcode
      : userDetails.shippingPostcode,
    title: "Holosun Optics UK",
    // tp: "shootingsupplies_payment_template.html",
  });
};

export default formatEqpdqData;
