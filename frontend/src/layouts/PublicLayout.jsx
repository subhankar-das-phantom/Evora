import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";

export function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {/* Marketing Spacing: Large whitespace, editorial composition */}
      <main className="flex-1 w-full mt-16 pb-24">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
