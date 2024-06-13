export const config = {
  emailTo: [
    { name: "Antony", email: "info@shootingsuppliesltd.co.uk" },
    { name: "Darryl", email: "darryl@shootingsuppliesltd.co.uk" },
  ],
  epdqURL: "https://payments.epdq.co.uk/ncol/prod/orderstandard_utf8.asp",
  // epdqURL: "https://mdepayments.epdq.co.uk/ncol/test/orderstandard_utf8.asp",
  acceptURL: "https://www.shootingsuppliesltd.co.uk/result?accept=true",
  // acceptURL: "http://localhost:3000/result?accept=true",
  declineURL: "https://www.shootingsuppliesltd.co.uk/result?accept=false",
  // declineURL: "http://localhost:3000/result?accept=false",
  backURL: "https://www.shootingsuppliesltd.co.uk/cart",
  // backURL: "http://localhost:3000/cart",
  cancelURL: "https://www.shootingsuppliesltd.co.uk/result?accept=cancelled",
  // cancelURL: "http://localhost:3000/result?accept=cancelled",
  exceptionURL: "https://www.shootingsuppliesltd.co.uk/result?accept=exception",
  // exceptionURL: "http://localhost:3000/result?accept=exception",
};
