import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa6";

const ViewPayment = () => {
  const [paymentData, setTransactions] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const { id } = useParams();
  const token = localStorage.getItem("token");
  const fetchTransaction = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}transactionSchemes/transaction/getByid/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      }
      );

      if (res.data.success) {
        setTransactions(res.data.data); // ✅ store data in state
      } else {
        setError(res.data.message || "Failed to fetch transactions");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransaction();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg font-medium">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className=" mx-auto bg-white shadow rounded-lg p-6">
        <div className="flex gap-2 items-center mb-3">
          <button
            onClick={() => navigate(-1)}
            className="text-black p-1 border-2 rounded-4xl"
          >
            <FaArrowLeft />
          </button>
          <h2 className="text-2xl font-semibold text-gray-800  border-b pb-2">
            Payment Details
          </h2>
        </div>

        {/* Customer Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Customer Details
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {paymentData?.customerId?.name}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {paymentData?.customerId?.contact}
            </p>
            <p>
              <span className="font-medium">Address:</span>{" "}
              {paymentData?.customerId?.address}
            </p>
            <p>
              <span className="font-medium">Ledger No:</span>{" "}
              {paymentData?.accountNumber}
            </p>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Transaction Details
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <p>
              <span className="font-medium">Transaction ID:</span>{" "}
              {paymentData?.transactionId}
            </p>
            <p>
              <span className="font-medium">Amount:</span>{" "}
              {paymentData?.amount}
            </p>
            <p>
              <span className="font-medium">Mode:</span> {paymentData?.mode}
            </p>
            <p>
              <span className="font-medium">Date:</span>{" "}
              {paymentData?.date
                ? new Date(paymentData.date).toDateString()
                : "N/A"}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded text-white ${paymentData?.status === "approved"
                    ? "bg-green-500"
                    : "bg-red-500"
                  }`}
              >
                {paymentData?.status}
              </span>
            </p>
          </div>
        </div>

        {/* Agent Details */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Agent Details
          </h3>
          <div className="flex items-center gap-4">
            {/* Agent Image */}
            <img
              src="https://via.placeholder.com/80"
              alt="Agent"
              className="w-20 h-20 rounded-full border"
            />
            <div className="text-sm">
              <p>
                <span className="font-medium">Name:</span>{" "}
                {paymentData?.agentId?.name}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {paymentData?.agentId?.contact}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {paymentData?.agentId?.email}
              </p>
              <p>
                <span className="font-medium">Address:</span>{" "}
                {paymentData?.agentId?.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPayment;
