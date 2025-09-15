import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ViewPayment = () => {

    const navigate = useNavigate()
  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between bg-[#fefaf5] p-4 rounded">
        <div className="flex items-center gap-2">
          <button onClick={()=>navigate(-1)} className="text-black p-1 border-2 rounded-4xl ">
            <FaArrowLeft />
          </button>
          <h2 className="text-lg font-semibold">View History</h2>
        </div>
        {/* <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-5 py-2 rounded">
          Save
        </button> */}
      </div>

      {/* Form */}
      <div className=" flex justify-center bg-[#fefaf5] p-6 mt-6 rounded ">
        <form className="space-y-4 w-100">
          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Costomer Name</label>
            <input
              type="text"
              defaultValue="John Doe"
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Agent Name</label>
            <input
              type="email"
              defaultValue="JohnDoe@example.com"
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Amount</label>
            <input
              type="text"
              defaultValue="98765 43210"
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Payment Mode</label>
            <input
              type="text"
              defaultValue="123, Elm Street, New Delhi, India"
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Transaction No.</label>
            <input
              type="text"
              defaultValue="FD"
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Date</label>
            <input
              type="text"
              defaultValue="₹1500"
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Time</label>
            <input
              type="text"
              defaultValue="2 Years"
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            />
          </div>

          <div className="flex items-center">
            <label className="w-40 font-medium text-sm">Tenure</label>
            <input
              type="text"
              defaultValue="6 Days"
              className="flex-1 border border-gray-300 px-3 py-2 rounded bg-gray-100"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewPayment;
