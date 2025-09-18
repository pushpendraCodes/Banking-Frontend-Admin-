import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");

  const {email} = useParams()

  const Navigate = useNavigate()

 const handleVerify = async (e) => {
  e.preventDefault();
  if (!otp) {
    alert("Enter OTP");
    return;
  }

  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}admin/verifyOtp`, {
      email, // or email if you're using email OTP
      otp,
    });

    if (res.data.success) {
      alert("OTP verified successfully!");
    //   onNext(); // move to reset password screen
    Navigate(`/reset-password/${email}`)
    } else {
      alert(res.data.message || "Invalid OTP");
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    alert("Something went wrong. Please try again.");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf7f3]">
      <div className="bg-white shadow-md rounded-2xl p-8 w-[420px] border">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-red-600">MAA ANUSAYA URBAN</h2>
          <p className="text-xs text-gray-500">
            Credit Co-operative Society Ltd. Gondiya
          </p>
        </div>

        <h3 className="text-lg font-semibold text-center mb-6">
          Verify OTP
        </h3>

        <form onSubmit={handleVerify} className="space-y-4">
          <p className="text-sm text-gray-600 text-center">
            OTP sent to <span className="font-medium">{email}</span>
          </p>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            required
          />

          <div className="flex justify-between pt-4">
            <button
              type="button"
              className="px-6 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50"
              onClick={() => window.location.reload()}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Verify
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
