// import api from "../api"; // centralized axios instance
import api from "./api";
import { apiDepositUrl, apiWithdrawalUrl } from "./apiRoutes";

export const WithdrawalHistoryData = async () => {
  try {
    const response = await api.get(apiWithdrawalUrl); // api instance use kiya
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
    const response = await api.get(apiDepositUrl); // api instance use kiya
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Error fetching payment history:", error);

    return {
      success: false,
      message:
        error.response?.data?.message ||
        error.message ||
        "Something went wrong while fetching payment history",
    };
  }
};
