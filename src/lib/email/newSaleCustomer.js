export async function newSaleCustomer(orderID, lines, customer) {
  try {
    const res = fetch("https://api.sendinblue.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.EMAIL_API,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "New Sale",
        templateId: 6,
        to: [{ name: customer.name, email: customer.email }],
        params: {
          firstname: customer.firstName,
          lastname: customer.lastName,
          address1: customer.address1,
          city: customer.city,
          county: customer.county,
          postcode: customer.postcode,
          phone: customer.phone,
          email: customer.email,
          lines: lines,
          orderID: orderID,
        },
      }),
    });

    const result = await res;
  } catch (error) {
    console.error(error);
  }
}
