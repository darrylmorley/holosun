export const config = {
  emailTo:
    process.env.NODE_ENV === "production"
      ? [
          { name: "Darryl", email: "darryl@shootingsuppliesltd.co.uk" },
          { name: "Antony", email: "info@shootingsuppliesltd.co.uk" },
          { name: "Staff", email: "staff@shootingsuppliesltd.co.uk" },
        ]
      : [{ name: "Darryl", email: "darryl@shootingsuppliesltd.co.uk" }],
  URLs: {
    exceptionurl: "/result?accept=exception",
    declineURL: "/result?accept=declined",
    cancelurl: "/result?accept=cancelled",
    acceptURL: "/result?accept=success",
    backurl: "/cart",
  },
  worldPayURL:
    process.env.NODE_ENV === "production"
      ? "https://access.worldpay.com/payment_pages"
      : "https://try.access.worldpay.com/payment_pages",
  worldpayEntity:
    process.env.NODE_ENV === "production"
      ? process.env.WORLDPAY_ENTITY
      : process.env.WORLDPAY_ENTITY_TEST,
  worldpayUser:
    process.env.NODE_ENV === "production"
      ? process.env.WORLDPAY_USER
      : process.env.WORLDPAY_USER_TEST,
  worldpayPassword:
    process.env.NODE_ENV === "production"
      ? process.env.WORLDPAY_PASSWORD
      : process.env.WORLDPAY_PASSWORD_TEST,
};
