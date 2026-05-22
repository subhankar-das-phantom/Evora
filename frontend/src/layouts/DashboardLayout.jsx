import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Navbar } from "@/components/layout/Navbar"; // For mobile or top-bar in dashboard

export function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-evora-surface-primary">
      <Navbar />
      
      {/* Sidebar starts below Navbar (pt-16) */}
      <Sidebar />
      
      <div className="flex flex-1 flex-col pt-16 md:pl-64">
        {/* Operational Clarity: Tighter spacing, denser information hierarchy */}
        <main className="flex-1 py-6">
          <div className="container-dashboard">
            <Suspense fallback={null}>
              <Outlet />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
