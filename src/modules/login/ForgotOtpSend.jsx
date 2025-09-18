import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function ForgotOtpSend() {
  const [email, setemail] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("Enter your email");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}admin/updatePasswordOtp`,
        { email }
      );

      if (res.data.success) {
        alert("OTP sent successfully!");
        navigate(`/otp-verify/${email}`);
      } else {
        alert(res.data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf7f3]">
      <div className="bg-white shadow-md rounded-2xl p-8 w-[420px] border">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-red-600">MAA ANUSAYA URBAN</h2>
          <p className="text-xs text-gray-500">
            Credit Co-operative Society Ltd. Gondiya
          </p>
        </div>

        <h3 className="text-lg font-semibold text-center mb-6">
          Forgot Password
        </h3>

        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Enter Registered Email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          <div className="flex justify-center pt-4">
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Send OTP
            </button>
          </div>
        </form>

        {/* Back to Login Link */}
        <div className="text-center mt-6">
          <Link
            to="/login"
            className="text-sm text-red-600 hover:underline"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
