import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Header at the top */}
      <Header />

      {/* Below header: Sidebar + main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar on the left */}
        <Sidebar />

        {/* Main content area */}
        <main className="p-6 bg-[#fefaf5] flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
