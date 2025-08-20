import axios from "axios";
import { apiDepositUrl, apiWithdrawalUrl } from "./apiRoutes";

// const BASE_URL = apiWithdrawalUrl;

export const WithdrawalHistoryData = async () => {
  try {
    const response = await axios.get(apiWithdrawalUrl);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching withdrawal history:", error);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong while fetching withdrawal history",
    };
  }
};

export const PaymentHistoryData = async () => {
  try {
    const response = await axios.get(apiDepositUrl);
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching withdrawal history:", error);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong while fetching withdrawal history",
    };
  }
};


 // src/api.js
// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:8000/api", // अपना base URL डालो
// });

// // हर request के साथ token भेजेगा
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// export default api;
