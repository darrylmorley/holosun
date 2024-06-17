import axios from "axios";
import rateLimit from "axios-rate-limit";

async function refreshToken() {
  const body = {
    grant_type: "refresh_token",
    client_id: process.env.LIGHTSPEED_ID,
    client_secret: process.env.LIGHTSPEED_SECRET,
    refresh_token: process.env.LIGHTSPEED_REFRESH_TOKEN,
  };

  try {
    const response = await axios.post(
      "https://cloud.lightspeedapp.com/oauth/access_token.php",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const tokenData = response.data;
    return tokenData.access_token;
  } catch (error) {
    console.error("Error refreshing token:", error.response ? error.response.data : error.message);
    throw new Error("Failed to refresh token");
  }
}

// Create an axios instance with rate limiting
const axiosApiInstance = rateLimit(
  axios.create({
    baseURL: `https://api.lightspeedapp.com/API/Account/${process.env.ACCOUNT_ID}/`,
    headers: {
      "Content-Type": "application/json",
    },
  }),
  { maxRequests: 1, perMilliseconds: 1000, maxRPS: 1 }
);

// Response interceptor for token refresh
axiosApiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const accessToken = await refreshToken();
      axiosApiInstance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
      return axiosApiInstance(originalRequest);
    }
    return Promise.reject(error);
  }
);

async function getHeader() {
  const token = await refreshToken();
  return {
    Authorization: `Bearer ${token}`,
  };
}

async function handleRequest(promise) {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default function formatCompleteSale(amount) {
  const sale = {
    employeeID: 10,
    registerID: 2,
    completed: true,
    SalePayments: {
      SalePayment: {
        paymentTypeID: 9,
        amount,
      },
    },
  };

  return JSON.stringify(sale);
}

export async function completeSale(saleID, amount) {
  const headers = await getHeader();
  const formattedSale = formatCompleteSale(amount);
  return handleRequest(axiosApiInstance.put(`Sale/${saleID}.json`, formattedSale, { headers }));
}

export async function cancelSale(saleID) {
  const headers = await getHeader();
  return handleRequest(axiosApiInstance.delete(`Sale/${saleID}.json`, { headers }));
}

export async function getSale(saleID) {
  const headers = await getHeader();
  const query = 'load_relations=["SaleLines", "SaleLines.Item"]';
  return handleRequest(axiosApiInstance.get(`Sale/${saleID}.json?${query}`, { headers }));
}
