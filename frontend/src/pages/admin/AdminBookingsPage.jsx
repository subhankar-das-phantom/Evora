import useSWR from "swr";
import { Ticket } from "lucide-react";
import { fetcher } from "@/api/axios";
import { DataTable } from "@/components/ui/DataTable";
import { Skeleton } from "@/components/ui/Skeleton";
import { format } from "date-fns";

export default function AdminBookingsPage() {
  const { data: bookingsData, isLoading } = useSWR("/bookings/all", fetcher);

  const bookings = bookingsData || [];

  const columns = [
    { 
      header: "Booking ID", 
      render: (row) => <span className="font-mono text-xs text-evora-text-secondary">{row._id.slice(-6).toUpperCase()}</span>
    },
    { 
      header: "User", 
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-medium text-evora-text-primary">{row.userId?.name || "Unknown"}</span>
          <span className="text-xs text-evora-text-muted">{row.userId?.email || ""}</span>
        </div>
      )
    },
    { 
      header: "Event", 
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-medium text-evora-text-primary">{row.eventId?.title || "Unknown Event"}</span>
          <span className="text-xs text-evora-text-muted">
            {row.eventId?.date ? format(new Date(row.eventId.date), "MMM d, yyyy") : ""}
          </span>
        </div>
      )
    },
    { 
      header: "Status", 
      render: (row) => (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          row.bookingStatus === "CONFIRMED" ? "bg-green-500/10 text-green-500" :
          row.bookingStatus === "CANCELLED" ? "bg-red-500/10 text-red-500" :
          "bg-evora-primary/10 text-evora-primary"
        }`}>
          {row.bookingStatus}
        </span>
      )
    },
    { 
      header: "Check-in", 
      render: (row) => (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
          row.checkedIn ? "bg-evora-primary/10 text-evora-primary" : "bg-evora-surface-hover text-evora-text-secondary"
        }`}>
          {row.checkedIn ? "Checked In" : "Pending"}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-evora-text-primary">All Bookings</h1>
          <p className="mt-1 text-sm text-evora-text-secondary">View and monitor all ticket reservations across the platform.</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-evora-primary/10 text-evora-primary">
          <Ticket className="h-5 w-5" />
        </div>
      </div>

      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <DataTable columns={columns} data={bookings} keyField="_id" />
      )}
    </div>
  );
}
