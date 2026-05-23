import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Calendar, 
  Ticket, 
  Users, 
  Settings, 
  LogOut,
  Sun,
  Moon,
  Home
} from "lucide-react";
import { authStore } from "@/store/authStore";
import { uiStore } from "@/store/uiStore";

export function Sidebar() {
  const { pathname } = useLocation();
  const user = authStore((s) => s.user);
  const logout = authStore((s) => s.logout);
  const theme = uiStore((s) => s.theme);
  const toggleTheme = uiStore((s) => s.toggleTheme);

  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";
  const basePath = isAdmin ? "/dashboard/admin" : "/dashboard/user";

  const adminLinks = [
    { label: "Overview", to: basePath, icon: LayoutDashboard, end: true },
    { label: "Manage Events", to: `${basePath}/events`, icon: Calendar },
    { label: "All Bookings", to: `${basePath}/bookings`, icon: Ticket },
    { label: "Users", to: `${basePath}/users`, icon: Users },
    { label: "Settings", to: `${basePath}/settings`, icon: Settings },
  ];

  const userLinks = [
    { label: "My Bookings", to: basePath, icon: Ticket, end: true },
    { label: "Saved Events", to: `${basePath}/saved`, icon: Calendar },
    { label: "Settings", to: `${basePath}/settings`, icon: Settings },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  return (
    <aside className="fixed top-16 bottom-0 left-0 z-40 hidden w-64 flex-col border-r border-evora-border bg-evora-surface-secondary md:flex">
      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 px-4 py-6">
        {links.map((link) => {
          const isActive = link.end 
            ? pathname === link.to 
            : pathname.startsWith(link.to);

          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-evora-primary/10 text-evora-primary"
                  : "text-evora-text-secondary hover:bg-evora-surface-hover hover:text-evora-text-primary"
              }`}
            >
              <link.icon className={`h-5 w-5 ${isActive ? "text-evora-primary" : "text-evora-text-muted"}`} />
              {link.label}
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}
