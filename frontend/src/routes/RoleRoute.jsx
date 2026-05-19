import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function RoleRoute({ allow = [] }) {
  const { user } = useAuth();
  if ((user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") && user?.firstLoginRequired) {
    return <Navigate to="/first-login-reset" replace />;
  }
  if (!user || !allow.includes(user.role)) {
    return <Navigate to="/events" replace />;
  }
  return <Outlet />;
}
