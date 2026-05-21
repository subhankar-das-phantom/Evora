import { Link } from "react-router-dom";
import { Ticket, Calendar, CheckCircle } from "lucide-react";
import { useBookings } from "@/hooks/useBookings";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/utils/format";
import { cn } from "@/utils/cn";

const statusStyles = {
  CONFIRMED: "bg-success/10 text-success border-success/20",
  PENDING: "bg-warning/10 text-warning border-warning/20",
  CANCELLED: "bg-error/10 text-error border-error/20",
  CHECKED_IN: "bg-primary/10 text-primary border-primary/20",
};

export default function UserDashboard() {
  const { bookings, isLoading } = useBookings();

  const stats = [
    {
      label: "Total Bookings",
      value: bookings.length,
      icon: Ticket,
      color: "text-primary",
    },
    {
      label: "Upcoming Events",
      value: bookings.filter(
        (b) => b.status === "CONFIRMED" && new Date(b.event?.date) > new Date()
      ).length,
      icon: Calendar,
      color: "text-accent",
    },
    {
      label: "Attended",
      value: bookings.filter((b) => b.status === "CHECKED_IN").length,
      icon: CheckCircle,
      color: "text-success",
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="font-headline text-headline-lg tracking-tight">
        My Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
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
                {isLoading ? "—" : value}
              </p>
              <p className="text-label-sm text-text-muted">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Bookings */}
      <div>
        <h2 className="font-headline text-headline-sm mb-4">My Bookings</h2>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <EmptyState
            icon={Ticket}
            title="No bookings yet"
            description="Browse events and book your first experience!"
            action={() => {}}
            actionLabel="Browse Events"
          />
        ) : (
          <div className="space-y-3">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="bg-surface border border-border rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 hover:border-border-hover transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-body-md font-medium text-text-primary truncate">
                    {booking.event?.title || "Event"}
                  </p>
                  <p className="text-label-sm text-text-muted">
                    {booking.event?.date
                      ? formatDate(booking.event.date)
                      : "—"}
                  </p>
                </div>
                <span
                  className={cn(
                    "inline-flex px-3 py-1 rounded-full text-label-sm font-medium border w-fit",
                    statusStyles[booking.status] || statusStyles.PENDING
                  )}
                >
                  {booking.status?.replace("_", " ") || "Pending"}
                </span>
                <Link to={`/events/${booking.event?._id}`}>
                  <Button variant="ghost" size="sm">
                    View Event
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
