import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="flex h-screen bg-slate-50">
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <Sidebar isCollapsed={isCollapsed} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          isCollapsed={isCollapsed}
          onToggleSidebar={() => setIsCollapsed((collapsed) => !collapsed)}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;