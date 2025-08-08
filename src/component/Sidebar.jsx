import { useState } from "react";
import {
  FaUser,
  FaUserTie,
  FaHistory,
  FaImages,
  FaCog,
  FaSignOutAlt,
  FaMoneyBillWave,
  FaCreditCard,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Customer", icon: <FaUser />, path: "/coustomers" },
  { name: "Agent", icon: <FaUserTie />, path: "/agent" },
  { name: "Manager", icon: <FaUserTie />, path: "/managers" },
  { name: "Payment History", icon: <FaMoneyBillWave />, path: "/payments-history" },
  { name: "Withdrawal History", icon: <FaCreditCard />, path: "/withdrawal-history" },
  { name: "Website Gallery", icon: <FaImages />, path: "/gallary" },
  { name: "Website Banner", icon: <FaImages />, path: "/banners" },
  { name: "Website Settings", icon: <FaCog />, path: "/settings" },
  { name: "Logout", icon: <FaSignOutAlt />, path: "/" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-red-600 text-white p-2 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed z-40 top-0 left-0 h-full w-[220px] bg-[#fef7ef] border-r p-4 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:block`}
      >
        <nav className="flex flex-col space-y-3 mt-12 lg:mt-0">
          {navItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 text-sm font-semibold border rounded-md transition ${
                  isActive
                    ? "bg-red-600 text-white"
                    : "text-red-600 border-red-300 hover:bg-red-50"
                }`
              }
              onClick={() => setIsOpen(false)} // close on mobile after click
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
