import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { uiStore } from "@/store/uiStore";
import {
  LayoutDashboard,
  Calendar,
  Ticket,
  User,
  Users,
  BarChart3,
  LogOut,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/utils/cn";

const userLinks = [
  { to: "/dashboard/user", label: "My Bookings", icon: Ticket, end: true },
  { to: "/dashboard/user/profile", label: "Profile", icon: User },
];

const adminLinks = [
  { to: "/dashboard/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/admin/events", label: "Events", icon: Calendar },
  { to: "/dashboard/admin/bookings", label: "Bookings", icon: Ticket },
  { to: "/dashboard/admin/users", label: "Users", icon: Users },
];

function SidebarLink({ to, label, icon: Icon, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-4 py-2.5 rounded-xl text-body-sm font-medium transition-all duration-200",
          isActive
            ? "bg-primary/10 text-primary"
            : "text-text-muted hover:text-text-primary hover:bg-surface-elevated"
        )
      }
    >
      <Icon size={18} />
      {label}
    </NavLink>
  );
}

export function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isSidebarOpen = uiStore((s) => s.isSidebarOpen);
  const toggleSidebar = uiStore((s) => s.toggleSidebar);
  const closeSidebar = uiStore((s) => s.closeSidebar);

  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";
  const links = isAdmin ? adminLinks : userLinks;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar overlay (mobile) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-64 bg-surface border-r border-border flex flex-col transition-transform duration-300 lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-border/50">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tighter text-text-primary font-headline">
              Evora
            </span>
            {isAdmin && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-label-sm">
                <ShieldCheck size={12} />
                Admin
              </span>
            )}
          </div>
          <button
            onClick={closeSidebar}
            className="lg:hidden text-text-muted hover:text-text-primary"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {links.map((link) => (
            <SidebarLink key={link.to} {...link} />
          ))}
        </nav>

        {/* User info + logout */}
        <div className="p-4 border-t border-border/50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary text-label-md font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-body-sm font-medium text-text-primary truncate">
                {user?.name || "User"}
              </p>
              <p className="text-label-sm text-text-muted truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-xl text-body-sm text-text-muted hover:text-error hover:bg-error/5 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="h-16 border-b border-border/50 flex items-center px-4 sm:px-6 gap-4 bg-background shrink-0">
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-text-muted hover:text-text-primary p-2"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <span className="text-body-sm text-text-muted hidden sm:block">
              {user?.name}
            </span>
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-label-sm font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
