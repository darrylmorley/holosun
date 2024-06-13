export function formatCompleteSale(amount) {
  const EMPLOYEE_ID = 10;
  const REGISTER_ID = 2;
  const PAYMENT_TYPE_ID = 9;

  return JSON.stringify({
    employeeID: EMPLOYEE_ID,
    registerID: REGISTER_ID,
    completed: true,
    SalePayments: {
      SalePayment: {
        paymentTypeID: PAYMENT_TYPE_ID,
        amount,
      },
    },
  });
}
