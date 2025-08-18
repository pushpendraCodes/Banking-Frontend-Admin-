import { useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
   const location = useLocation();

  
  const hideSidebarRoutes = ["/login", "/forgot-password"];

  const shouldHideSidebar = hideSidebarRoutes.includes(location.pathname);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header at the top */}
      <Header />

      {/* Below header: Sidebar + main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar on the left */}
        {!shouldHideSidebar &&  <Sidebar />}

        {/* Main content area */}
        <main className="p-6 bg-[#fefaf5] flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
