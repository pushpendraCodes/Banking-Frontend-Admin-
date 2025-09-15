import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link, useNavigate, useParams } from "react-router-dom";

function ViewManager() {
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

  return (<>
   <div className="bg-[#fefaf5] px-3 flex items-center gap-2">
                <button onClick={() => navigate(-1)} className="text-black p-1 border-2 rounded-4xl">
                  <FaArrowLeft />
                </button>
                <h2 className="text-lg font-bold">Viwe Manager</h2>
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
  
     
      </div>
        </div>
   
    </>
  )
}

export default ViewManager