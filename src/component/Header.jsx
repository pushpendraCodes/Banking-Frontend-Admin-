import { useState } from "react";
import UpdateProfileModal from "../modules/settings/UpdateProfileModal";

const Header = () => {
  const [isModalOpen, setOpen] = useState(false);

  return (
    <header className="bg-[#f9f2e9] border-b shadow-sm py-3 px-4 flex flex-wrap md:flex-nowrap justify-between items-center gap-2">
      <div className="flex-1 text-center md:text-left min-w-[200px]">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#d01e28] uppercase">
          MAA ANUSAYA URBAN
        </h1>
        <p className="text-xs sm:text-sm text-gray-700 -mt-1">
          Credit Co-operative Socity Ltd. Gondiya
        </p>
      </div>

      <div
        onClick={() => setOpen(true)}
        className="w-10 h-10 sm:w-12 sm:h-12 border-2 border-red-400 rounded-full bg-gray-100 cursor-pointer"
      />

      <UpdateProfileModal isOpen={isModalOpen} onClose={() => setOpen(false)} />
    </header>
  );
};

export default Header;
