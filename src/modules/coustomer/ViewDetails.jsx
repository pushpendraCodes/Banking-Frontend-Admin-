import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link, useNavigate, useParams } from "react-router-dom";

function ViewDetails() {
  const navigate = useNavigate();

  // Dummy user info (API से आएगा)
  const user = {
    name: "John Doe",
    email: "JohnDoe@example.com",
    contact: "98765 43210",
    address: "123, Elm Street, New Delhi, India",
    agent: "Jerome Bell",
    manager: "Darlene Robertson",
  }

  // Dummy accounts data (API से आएगा)
  const accounts = [
    {
      id: "FD001249",
      type: "FD",
      customerName: "Neha Singh",
      amount: 100000,
      paymentMode: "Cash",
      status: "Active",
      roi: "7.5%",
      depositDate: "Tue Sep 29 2020",
      maturityDate: "Tue Sep 29 2028",
    },
    {
      id: "RD-1002",
      type: "RD",
      customerName: "Sara Satterfield",
      accountType: "Standard RD",
      monthlyDeposit: 5000,
      paymentMode: "Cash",
      status: "Active",
      lastPaymentDate: "Tue Oct 28 2024",
      startDate: "Sat Sep 28 2024",
      endDate: "Sat Aug 28 2028",
      maturityDate: "Sat Sep 28 2028",
    },
  ]

  return (
    <>
     <div className="bg-[#fefaf5] px-3 flex items-center gap-2">
              <button onClick={() => navigate(-1)} className="text-black p-1 border-2 rounded-4xl">
                <FaArrowLeft />
              </button>
              <h2 className="text-lg font-bold">Viwe Details</h2>
       </div>
       <div className="flex justify-center items-center flex-col bg-[#fff9f1] p-6 mt-6 rounded">
       

      <div className="p-6 space-y-6 max-w-4xl mx-auto">
      {/* User Info Section */}
      <div className="">
        <div className="w-130 flex flex-col text-sm text-gray-700">
          <div className='flex justify-between items-center mb-4 '>
            <span className="font-medium">Name :</span>
            <span className='bg-gray-100 p-1 rounded-sm w-60 block '>{user.name}</span>
          </div>
          <div className='flex justify-between items-center mb-4 '>
            <span className="font-medium">Email Address :</span>
            <span className='bg-gray-100 p-1 rounded-sm w-60 block '>{user.email}</span>
          </div>
          <div className='flex justify-between items-center mb-4 '>
            <span className="font-medium">Contact No. :</span>
            <span className='bg-gray-100 p-1 rounded-sm w-60 block '>{user.contact}</span>
          </div>
          <div className='flex justify-between items-center mb-4 '>
            <span className="font-medium">Address :</span>
            <span className='bg-gray-100 p-1 rounded-sm w-60 block '>{user.address}</span>
          </div>
          <div className='flex justify-between items-center mb-4 '>
            <span className="font-medium">Agent :</span> 
            <span className='bg-gray-100 p-1 rounded-sm w-60 block '>{user.agent}</span>
          </div>
          <div className='flex justify-between items-center mb-4 '>
            <span className="font-medium">Manager :</span>
            <span className='bg-gray-100 p-1 rounded-sm w-60 block '>{user.manager}</span>
          </div>
        </div>
      </div>

      {/* Accounts List Section */}
      <div className="space-y-6">
        {accounts.map((acc, i) => (
          <div
            key={i}
            className="border border-gray-300 rounded-xl p-5  shadow-sm hover:shadow-md transition"
          >
            <div className="space-y-1 text-sm text-gray-700">
              <p className='flex justify-between'>
                <span className="font-medium">{acc.type} Account No :</span> {acc.id}
              </p>
              <p className='flex justify-between'><span className="font-medium">Customer Name :</span> {acc.customerName}</p>

              {acc.type === "FD" && (
                <>
                  <p className='flex justify-between'><span className="font-medium">FD Amount (₹) :</span> {acc.amount}</p>
                  <p className='flex justify-between'><span className="font-medium">Payment Mode :</span> {acc.paymentMode}</p>
                  <p className='flex justify-between'><span className="font-medium">Status :</span>{" "}
                    <span className="text-green-600 font-semibold">{acc.status}</span>
                  </p>
                  <p className='flex justify-between'><span className="font-medium">Rate Of Interest :</span> {acc.roi}</p>
                  <p className='flex justify-between'><span className="font-medium">Deposit Date :</span> {acc.depositDate}</p>
                  <p className='flex justify-between'><span className="font-medium">Maturity Date :</span> {acc.maturityDate}</p>
                </>
              )}

              {acc.type === "RD" && (
                <>
                  <p className='flex justify-between'><span className="font-medium">Account Type :</span> {acc.accountType}</p>
                  <p className='flex justify-between'><span className="font-medium">Monthly Deposit (₹) :</span> {acc.monthlyDeposit}</p>
                  <p className='flex justify-between'><span className="font-medium">Payment Mode :</span> {acc.paymentMode}</p>
                  <p className='flex justify-between'><span className="font-medium">Status :</span>{" "}
                    <span className="text-green-600 font-semibold">{acc.status}</span>
                  </p>
                  <p className='flex justify-between'><span className="font-medium">Last Payment Date :</span> {acc.lastPaymentDate}</p>
                  <p className='flex justify-between'><span className="font-medium">Start Date :</span> {acc.startDate}</p>
                  <p className='flex justify-between'><span className="font-medium">End Date :</span> {acc.endDate}</p>
                  <p className='flex justify-between'><span className="font-medium">Maturity Date :</span> {acc.maturityDate}</p>
                </>
              )}
            </div>

            <div className="mt-4">
              <Link to={`/coustomers/paymentdetails/${acc.id}`}>
              <button className="w-24 bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 rounded-lg shadow ml-auto block">
                View
              </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
      </div>
    </>
  )
}

export default ViewDetails