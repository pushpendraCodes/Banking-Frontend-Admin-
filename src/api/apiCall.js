// import axios from "axios";

// const BASE_URL = "https://banking-be-5zt5.onrender.com/api/customer";

// export const createCustomer = async (customerData) => {
//   const response = await axios.post(BASE_URL, customerData);
//   return response.data;
// };
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
