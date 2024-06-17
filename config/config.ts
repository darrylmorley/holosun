export const config = {
  emailTo: [
    // { name: "Antony", email: "info@shootingsuppliesltd.co.uk" },
    { name: "Darryl", email: "darryl@shootingsuppliesltd.co.uk" },
  ],
  // epdqURL: "https://payments.epdq.co.uk/ncol/prod/orderstandard_utf8.asp",
  epdqURL: "https://mdepayments.epdq.co.uk/ncol/test/orderstandard_utf8.asp",
  // acceptURL: "https://www.holosun-optics.co.uk/shop/result?accept=true",
  acceptURL: "http://localhost:3000/shop/result?accept=true",
  // declineURL: "https://www.holosun-optics.co.uk/shop/result?accept=false",
  declineURL: "http://localhost:3000/shop/result?accept=false",
  // backURL: "https://www.holosun-optics.co.uk/shop/cart",
  backURL: "http://localhost:3000/shop/cart",
  // cancelURL: "https://www.holosun-optics.co.uk/shop/result?accept=cancelled",
  cancelURL: "http://localhost:3000/shop/shop/result?accept=cancelled",
  // exceptionURL: "https://www.holosun-optics.co.uk/shop/result?accept=exception",
  exceptionURL: "http://localhost:3000/shop/shop/result?accept=exception",
};
