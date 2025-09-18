import React from "react";
import { FaChevronRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const settingsList = [
 { name:"Career" ,path:"/settings/recruitment"},
{  name:"Loan Applications" ,path:"/settings/forms/loan" },
{ name: "Legal Documents",path:"/settings/forms/legal" },
{ name: "Schemes Documents",path:"/settings/forms/schemes" },
{ name: "About us ",path:"/settings/aboutUs" },
{ name: "FAQ ",path:"/settings/faq" },
];

const Settings = () => {
  return (
    <div className=" mx-auto bg-[#fff8f0] p-6 rounded shadow">
     <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      {settingsList.map((item, index) => (
        <Link
        to={item.path}
          key={index}
          className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition-colors px-4 py-3 mb-2 rounded cursor-pointer"
        >
          <span className="text-sm font-medium text-gray-800">{item.name}</span>
          <FaChevronRight  className="w-4 h-4 text-gray-600" />
        </Link>
      ))}
    </div>
  );
};

export default Settings;
