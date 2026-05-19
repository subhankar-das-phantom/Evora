import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { RoleRoute } from "./RoleRoute";
import { Skeleton } from "@/components/ui/Skeleton";

const LandingPage = lazy(() => import("@/pages/LandingPage"));
const EventsPage = lazy(() => import("@/pages/EventsPage"));
const EventDetailsPage = lazy(() => import("@/pages/EventDetailsPage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("@/pages/auth/RegisterPage"));
const FirstLoginResetPage = lazy(() => import("@/pages/auth/FirstLoginResetPage"));
const UserDashboardPage = lazy(() => import("@/pages/user/UserDashboard"));
const AdminOverviewPage = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminEventsPage = lazy(() => import("@/pages/admin/AdminEventsPage"));
const AdminUsersPage = lazy(() => import("@/pages/admin/AdminUsersPage"));
const AdminBookingsPage = lazy(() => import("@/pages/admin/AdminBookingsPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

function RouteLoader() {
  return (
    <div className="container-shell space-y-3 py-6">
      <Skeleton className="h-12 w-56" />
      <Skeleton className="h-56 w-full" />
      <Skeleton className="h-56 w-full" />
    </div>
  );
}

export function AppRouter() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/:eventId" element={<EventDetailsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/first-login-reset" element={<FirstLoginResetPage />} />
          <Route element={<DashboardLayout />}>
            <Route element={<RoleRoute allow={["USER"]} />}>
              <Route path="/dashboard/user/*" element={<UserDashboardPage />} />
            </Route>
            <Route element={<RoleRoute allow={["ADMIN", "SUPER_ADMIN"]} />}>
              <Route path="/dashboard/admin" element={<AdminOverviewPage />} />
              <Route path="/dashboard/admin/events" element={<AdminEventsPage />} />
              <Route path="/dashboard/admin/users" element={<AdminUsersPage />} />
              <Route path="/dashboard/admin/bookings" element={<AdminBookingsPage />} />
            </Route>
            <Route path="/dashboard" element={<Navigate to="/events" replace />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}
