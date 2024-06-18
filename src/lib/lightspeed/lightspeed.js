"use server";
import axios from "axios";
import rateLimit from "axios-rate-limit";

export default async function refreshToken() {
  const body = {
    grant_type: "refresh_token",
    client_id: process.env.LIGHTSPEED_ID,
    client_secret: process.env.LIGHTSPEED_SECRET,
    refresh_token: process.env.LIGHTSPEED_REFRESH_TOKEN,
  };

  const response = await axios({
    url: "https://cloud.lightspeedapp.com/oauth/access_token.php",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(body),
  }).catch((error) => console.error(error.data));

  const tokenData = await response.data;
  const token = tokenData.access_token;

  return token;
}

async function getHeader() {
  const token = await refreshToken();

  const header = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const axiosConfig = {
    baseURL: `https://api.lightspeedapp.com/API/Account/${process.env.ACCOUNT_ID}/`,
    headers: header,
  };

  return axiosConfig;
}

const http = rateLimit(axios.create(), {
  maxRequests: 1,
  perMilliseconds: 1000,
  maxRPS: 1,
});

export async function fetchCustomer(email) {
  const axiosConfig = await getHeader();
  const getCustomer = await http
    .get(`Customer.json?load_relations=["Contact"]&Contact.email=${email}`, axiosConfig)
    .catch((error) => console.error(error));
  const customer = JSON.stringify(getCustomer.data);
  return customer;
}

export async function createCustomer(customerData) {
  const axiosConfig = await getHeader();
  const postCustomer = await http
    .post("Customer.json", customerData, axiosConfig)
    .catch((error) => console.error(error.data));
  const customerResponse = JSON.stringify(postCustomer.data);
  return customerResponse;
}

export async function getCustomerSales(customerID) {
  const axiosConfig = await getHeader();
  const customerSales = await http
    .get(
      `Sale.json?customerID=${customerID}&load_relations=["SaleLines", "SaleLines.Item"]`,
      axiosConfig
    )
    .catch((error) => console.error(error));
  return customerSales.data;
}

export async function createSale(postData) {
  const axiosConfig = await getHeader();
  const postSale = await http.post(`Sale.json`, postData, axiosConfig).catch((error) => {
    console.error(error);
  });
  return postSale.data.Sale.saleID;
}

export async function completeSale(saleID, amount) {
  const axiosConfig = await getHeader();

  const sale = {
    employeeID: 13,
    registerID: 2,
    completed: true,
    SalePayments: {
      SalePayment: {
        paymentTypeID: 9,
        amount,
      },
    },
  };

  const post = await http
    .put(`Sale/${saleID}.json`, sale, axiosConfig)
    .catch((error) => console.error(error));
  return post.data;
}

export async function cancelSale(saleID, amount) {
  const axiosConfig = await getHeader();
  const cancelEposSale = await http
    .delete(`Sale/${saleID}.json?load_relations["SaleLines.Item"]`, axiosConfig)
    .catch((error) => console.error(error));
  return cancelEposSale.data;
}

export async function getSale(saleID) {
  const axiosConfig = await getHeader();
  const get = await http
    .get(`Sale/${saleID}.json?load_relations=["SaleLines", "SaleLines.Item"]`, axiosConfig)
    .catch((error) => console.error(error));
  return get.data;
}
