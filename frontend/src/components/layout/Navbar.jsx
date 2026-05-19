import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard, User, Sun, Moon } from "lucide-react";
import { authStore } from "@/store/authStore";
import { uiStore } from "@/store/uiStore";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();
  const user = authStore((s) => s.user);
  const token = authStore((s) => s.token);
  const logout = authStore((s) => s.logout);
  const theme = uiStore((s) => s.theme);
  const toggleTheme = uiStore((s) => s.toggleTheme);

  const isLoggedIn = !!token;
  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";
  const dashboardPath = isAdmin ? "/dashboard/admin" : "/dashboard/user";

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Events", to: "/events" },
  ];

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-evora-border/50 bg-evora-surface-primary/80 backdrop-blur-md">
      <div className="container-content flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-display text-xl font-bold tracking-tight text-evora-primary">
          EVORA
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors duration-fast ease-premium hover:text-evora-primary ${
                pathname === link.to ? "text-evora-primary" : "text-evora-text-secondary"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-evora-text-secondary transition-colors duration-fast hover:bg-evora-surface-hover hover:text-evora-text-primary"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {isLoggedIn ? (
            <>
              <Link
                to={dashboardPath}
                className={`text-sm font-medium transition-colors duration-fast ease-premium hover:text-evora-primary ${
                  pathname.startsWith("/dashboard") ? "text-evora-primary" : "text-evora-text-secondary"
                }`}
              >
                Dashboard
              </Link>
              <div className="flex items-center gap-3 border-l border-evora-border pl-6">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-evora-primary/10 text-xs font-semibold text-evora-primary">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <span className="text-sm font-medium text-evora-text-primary max-w-[120px] truncate">
                  {user?.name || "User"}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-evora-text-muted transition-colors hover:bg-evora-surface-hover hover:text-evora-text-primary"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3 border-l border-evora-border pl-6">
              <Link
                to="/login"
                className="text-sm font-medium text-evora-text-secondary transition-colors hover:text-evora-primary"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="inline-flex h-9 items-center justify-center rounded-xl bg-evora-primary px-5 text-sm font-medium text-evora-primary-foreground transition-all duration-fast ease-premium hover:bg-evora-primary-hover"
              >
                Get Started
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-evora-text-secondary md:hidden hover:bg-evora-surface-hover"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-evora-border bg-evora-surface-secondary px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`flex h-11 items-center rounded-xl px-4 text-sm font-medium transition-colors ${
                  pathname === link.to
                    ? "bg-evora-primary/10 text-evora-primary"
                    : "text-evora-text-secondary hover:bg-evora-surface-hover"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <button
              onClick={() => {
                toggleTheme();
                setMobileOpen(false);
              }}
              className="flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-medium text-evora-text-secondary hover:bg-evora-surface-hover"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </button>

            {isLoggedIn ? (
              <>
                <Link
                  to={dashboardPath}
                  onClick={() => setMobileOpen(false)}
                  className="flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-medium text-evora-text-secondary hover:bg-evora-surface-hover"
                >
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
                <Link
                  to="/dashboard/user"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-medium text-evora-text-secondary hover:bg-evora-surface-hover"
                >
                  <User className="h-4 w-4" /> Profile
                </Link>
                <div className="my-2 border-t border-evora-border" />
                <button
                  onClick={handleLogout}
                  className="flex h-11 items-center gap-2 rounded-xl px-4 text-sm font-medium text-red-500 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </>
            ) : (
              <>
                <div className="my-2 border-t border-evora-border" />
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-11 items-center rounded-xl px-4 text-sm font-medium text-evora-text-secondary hover:bg-evora-surface-hover"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-11 items-center justify-center rounded-xl bg-evora-primary px-4 text-sm font-medium text-evora-primary-foreground"
                >
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
