import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { WithdrawalHistoryData } from "../../api/apiCall";
import { useEffect, useState } from "react";

export default  function  WithdrawalHistory() {
const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      const result = await WithdrawalHistoryData()
     

      // const result = await WithdrawalHistory();

      if (result.success) {
        setTransactions(result.data); // API data state me daal diya
      } else {
        setError(result.message); // error state me daal diya
      }
      setLoading(false);
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <p className="text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }
 console.log(transactions.data,",,.resultData")
  return (
    <div className="bg-[#fef7ef]  sm:p-6 rounded-lg shadow-md">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Withdrawal History</h2>

      {/* Responsive table wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border whitespace-nowrap">Sr.</th>
              <th className="p-2 border whitespace-nowrap">Customer Name</th>
              <th className="p-2 border whitespace-nowrap">Agent Name</th>
              <th className="p-2 border whitespace-nowrap">Amount</th>
              <th className="p-2 border whitespace-nowrap">Payment Mode</th>
              <th className="p-2 border whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.data.map((data, index) => (
              <tr key={index} className="odd:bg-white even:bg-yellow-50">
                <td className="p-2 border">{index+1}</td>
                <td className="p-2 border">{data.customerId.name}</td>
                <td className="p-2 border">{data.collectedByAgentId.name}</td>
                <td className="p-2 border">{data.amount}</td>
                <td className="p-2 border text-green-600">{data.paymentMethod}</td>
                <td className="p-2 border">
                  <div className="flex gap-2">
                    <Link
                      to={index === 0 ? "/payments-history/1" : "/managers/view-edit/1"}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded"
                      title="View"
                    >
                      <FaEye size={14} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 text-sm text-gray-600 gap-2">
        <div>Showing 1 to 5 of 5 Entries</div>
        <div className="flex gap-2">
          <button className="border border-red-400 text-red-500 px-3 py-1 rounded hover:bg-red-50">
            Previous
          </button>
          <button className="bg-red-500 text-white px-3 py-1 rounded">1</button>
          <button className="border border-red-400 text-red-500 px-3 py-1 rounded hover:bg-red-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
