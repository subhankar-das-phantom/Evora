import { Calendar, Ticket, DollarSign, Users, Plus } from "lucide-react";
import { useAdminStats } from "@/hooks/useAdminStats";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

const statusStyles = {
  CONFIRMED: "bg-success/10 text-success border-success/20",
  PENDING: "bg-warning/10 text-warning border-warning/20",
  CANCELLED: "bg-error/10 text-error border-error/20",
  CHECKED_IN: "bg-primary/10 text-primary border-primary/20",
};

export default function AdminDashboard() {
  const { stats, isLoading } = useAdminStats();

  const statCards = [
    {
      label: "Total Events",
      value: stats?.totalEvents || 0,
      icon: Calendar,
      color: "text-primary",
    },
    {
      label: "Total Bookings",
      value: stats?.totalBookings || 0,
      icon: Ticket,
      color: "text-accent",
    },
    {
      label: "Total Revenue",
      value: `$${stats?.totalRevenue || 0}`,
      icon: DollarSign,
      color: "text-success",
    },
    {
      label: "Active Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      color: "text-cyan",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-headline text-headline-lg tracking-tight">
          Admin Dashboard
        </h1>
        <Link to="/dashboard/admin/events">
          <Button size="sm">
            <Plus size={16} />
            Create Event
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div
            key={label}
            className="bg-surface border border-border rounded-xl p-5 flex items-center gap-4"
          >
            <div
              className={cn(
                "w-11 h-11 rounded-xl flex items-center justify-center bg-surface-elevated",
                color
              )}
            >
              <Icon size={20} />
            </div>
            <div>
              <p className="text-headline-md font-headline font-bold text-text-primary">
                {isLoading ? <Skeleton className="h-6 w-16" /> : value}
              </p>
              <p className="text-label-sm text-text-muted">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Bookings */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-headline text-headline-sm">Recent Bookings</h2>
          <Link to="/dashboard/admin/bookings">
            <Button variant="ghost" size="sm">
              View all
            </Button>
          </Link>
        </div>

        <div className="bg-surface border border-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left px-5 py-3 text-label-sm text-text-muted font-medium">
                    User
                  </th>
                  <th className="text-left px-5 py-3 text-label-sm text-text-muted font-medium">
                    Event
                  </th>
                  <th className="text-left px-5 py-3 text-label-sm text-text-muted font-medium hidden sm:table-cell">
                    Date
                  </th>
                  <th className="text-left px-5 py-3 text-label-sm text-text-muted font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="border-b border-border/30">
                      <td className="p-5">
                        <Skeleton className="h-4 w-24" />
                      </td>
                      <td className="p-5">
                        <Skeleton className="h-4 w-32" />
                      </td>
                      <td className="p-5 hidden sm:table-cell">
                        <Skeleton className="h-4 w-20" />
                      </td>
                      <td className="p-5">
                        <Skeleton className="h-4 w-16" />
                      </td>
                    </tr>
                  ))
                ) : stats?.recentBookings?.length > 0 ? (
                  stats.recentBookings.slice(0, 10).map((booking) => (
                    <tr
                      key={booking._id}
                      className="border-b border-border/30 hover:bg-surface-elevated/50 transition-colors"
                    >
                      <td className="px-5 py-4 text-body-sm text-text-primary">
                        {booking.user?.name || "—"}
                      </td>
                      <td className="px-5 py-4 text-body-sm text-text-secondary truncate max-w-[200px]">
                        {booking.event?.title || "—"}
                      </td>
                      <td className="px-5 py-4 text-body-sm text-text-muted hidden sm:table-cell">
                        {booking.createdAt
                          ? new Date(booking.createdAt).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={cn(
                            "inline-flex px-2.5 py-0.5 rounded-full text-label-sm font-medium border",
                            statusStyles[booking.status] ||
                              statusStyles.PENDING
                          )}
                        >
                          {booking.status?.replace("_", " ") || "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-5 py-12 text-center text-text-muted text-body-sm"
                    >
                      No bookings yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
