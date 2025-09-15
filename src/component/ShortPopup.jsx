import React, { useState } from 'react';

function ShortPopup({ show, onClose ,setStartDate,setEndDate,startDate,endDate}) {


  if (!show) return null; // Agar show false hai toh kuch render hi na ho

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0000007a] bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h3 className="text-lg font-semibold mb-3">Sort Datewise</h3>
        <div className="flex flex-col gap-3">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-3 py-2 rounded"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-3 py-2 rounded"
          />
        </div>
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-400"
          >
            Cancel
          </button>
          {/* <button
            onClick={() => {
              console.log("Apply filter from", startDate, "to", endDate);
              onClose(); // close karne ke liye
            }}
            className="px-4 py-2 rounded bg-yellow-400 text-white hover:bg-yellow-500"
          >
            Apply
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default ShortPopup;
