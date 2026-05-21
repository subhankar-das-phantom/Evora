import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { href: "/events", label: "Events" },
  ];

  const dashboardPath =
    user?.role === "ADMIN" || user?.role === "SUPER_ADMIN"
      ? "/dashboard/admin"
      : "/dashboard/user";

  return (
    <nav
      id="main-navbar"
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 border-b",
        isScrolled
          ? "bg-background/90 backdrop-blur-md border-border/50 shadow-sm"
          : "bg-background/80 backdrop-blur-md border-transparent"
      )}
    >
      <div className="flex items-center justify-between px-4 sm:px-6 h-16 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-xl font-bold tracking-tighter text-text-primary font-headline"
          >
            Evora
          </Link>
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "font-headline text-label-md tracking-tight transition-colors duration-200",
                  location.pathname === link.href
                    ? "text-primary font-semibold"
                    : "text-text-muted hover:text-text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link to={dashboardPath}>
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <button
                onClick={logout}
                className="text-label-md text-text-muted hover:text-text-primary transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-label-md font-medium text-text-secondary hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link to="/register">
                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded-full border-primary/20 bg-primary/10 text-primary hover:bg-primary/20"
                >
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-text-muted hover:text-text-primary p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border animate-fade-in">
          <div className="flex flex-col px-6 py-4 gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-body-md text-text-secondary hover:text-text-primary py-2"
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-border/50 pt-3 mt-2 flex flex-col gap-2">
              {isAuthenticated ? (
                <>
                  <Link to={dashboardPath}>
                    <Button variant="secondary" size="md" className="w-full">
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="ghost" size="md" onClick={logout} className="w-full">
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="secondary" size="md" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="primary" size="md" className="w-full">
                      Sign Up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
