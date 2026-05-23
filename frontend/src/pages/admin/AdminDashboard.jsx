import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import { Users, Calendar, TicketCheck, ArrowUpRight } from "lucide-react";
import { fetcher } from "@/api/axios";
import { DataTable } from "@/components/ui/DataTable";
import { Skeleton } from "@/components/ui/Skeleton";

export default function AdminDashboard() {
  const { data: statsData, isLoading: statsLoading } = useSWR("/admin/analytics", fetcher);
  const { data: recentEventsData, isLoading: eventsLoading } = useSWR("/events?limit=5", fetcher);

  const stats = statsData || {
    totalEvents: 0,
    totalBookings: 0,
    totalUsers: 0
  };

  const recentEvents = recentEventsData?.items || recentEventsData?.events || [];

  const statCards = [
    { 
      label: "Total Events", 
      value: stats.events, 
      icon: Calendar,
      trend: stats.eventsTrend ?? 12,
      isPositive: (stats.eventsTrend ?? 12) >= 0 
    },
    { 
      label: "Total Bookings", 
      value: stats.bookings, 
      icon: TicketCheck,
      trend: stats.bookingsTrend ?? 8,
      isPositive: (stats.bookingsTrend ?? 8) >= 0 
    },
    { 
      label: "Total Users", 
      value: stats.users, 
      icon: Users,
      trend: stats.usersTrend ?? 24,
      isPositive: (stats.usersTrend ?? 24) >= 0 
    },
  ];

  const navigate = useNavigate();

  const columns = [
    { header: "Event Title", accessor: "title" },
    { header: "Category", accessor: "category" },
    { 
      header: "Status", 
      render: (row) => (
        <span className="inline-flex items-center rounded-full bg-evora-primary/10 px-2.5 py-0.5 text-xs font-semibold text-evora-primary">
          {row.status || "Upcoming"}
        </span>
      )
    },
    { 
      header: "Booked", 
      render: (row) => `${row.bookedSeats}/${row.maxSeats}`
    },
    { 
      header: "Actions", 
      render: () => (
        <button 
          onClick={() => navigate("/dashboard/admin/events")}
          className="text-evora-primary transition-colors hover:text-evora-primary-hover"
        >
          Manage
        </button>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-evora-text-primary">Admin Dashboard</h1>
        <p className="mt-1 text-evora-text-secondary">Platform overview and operational controls.</p>
      </div>

      {/* Analytics Overview */}
      <div className="grid gap-4 sm:grid-cols-3">
        {statsLoading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="flex flex-col rounded-2xl border border-evora-border bg-evora-surface-secondary p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <Skeleton className="h-9 w-20" />
                <Skeleton className="h-4 w-12" />
              </div>
            </div>
          ))
        ) : (
          statCards.map((stat, i) => (
            <div key={i} className="flex flex-col rounded-2xl border border-evora-border bg-evora-surface-secondary p-6 shadow-soft">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-evora-text-secondary">{stat.label}</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-evora-surface-muted">
                  <stat.icon className="h-5 w-5 text-evora-primary" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-3xl font-semibold text-evora-text-primary">
                  {(stat.value ?? 0).toLocaleString()}
                </span>
                <span 
                  className={`flex items-center text-xs font-medium ${
                    stat.isPositive ? "text-evora-trend-positive" : "text-evora-trend-negative"
                  }`}
                >
                  <ArrowUpRight 
                    className={`mr-0.5 h-3 w-3 transition-transform ${
                      stat.isPositive ? "" : "rotate-90"
                    }`} 
                  />
                  {Math.abs(stat.trend)}%
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Recent Events Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-evora-text-primary">Recent Events</h2>
          <button 
            onClick={() => navigate("/dashboard/admin/events")}
            className="text-sm font-medium text-evora-primary hover:text-evora-primary-hover"
          >
            View All
          </button>
        </div>
        
        <DataTable 
          columns={columns} 
          data={recentEvents} 
          keyField="_id" 
          isLoading={eventsLoading}
        />
      </div>
    </div>
  );
}
