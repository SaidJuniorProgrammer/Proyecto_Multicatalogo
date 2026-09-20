import { Link } from "react-router-dom";
import { LayoutDashboard, Package, Users } from "lucide-react";

const menuItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/catalogo", label: "Catálogo", icon: Package },
  { to: "/mi-red", label: "Mi Red", icon: Users },
];

const Sidebar = ({ isCollapsed }: { isCollapsed: boolean }) => {
  return (
    <aside
      className={`
        fixed md:relative z-50 h-screen
        ${isCollapsed ? "-translate-x-full md:translate-x-0 md:w-20" : "translate-x-0 w-64"}
        shrink-0 bg-sky-600 text-white flex flex-col transition-all duration-300
      `}
    >
      <div
        className={`${isCollapsed ? "px-2 text-center" : "px-6"} py-6 text-2xl font-bold border-b border-slate-700 overflow-hidden whitespace-nowrap`}
        title="MultiCatálogo"
      >
        {isCollapsed ? "M" : "MultiCatálogo"}
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            title={isCollapsed ? label : undefined}
            aria-label={label}
            className={`${isCollapsed ? "justify-center" : "gap-3"} flex items-center p-3 rounded hover:bg-slate-800 transition`}
          >
            <Icon aria-hidden="true" size={21} strokeWidth={2} />
            <span className={`${isCollapsed ? "hidden" : "block"}`}>{label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;