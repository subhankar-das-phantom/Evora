import { useState } from "react";
import { Plus, Search, Edit, Eye } from "lucide-react";
import { useEvents } from "@/hooks/useEvents";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "@/api/axios";
import { endpoints } from "@/api/endpoints";
import { uiStore } from "@/store/uiStore";
import { formatDate, seatsLeft } from "@/utils/format";
import { cn } from "@/utils/cn";

const createSchema = z.object({
  title: z.string().min(3, "Title required"),
  description: z.string().min(10, "Description too short"),
  date: z.string().min(1, "Date required"),
  venue: z.string().min(2, "Venue required"),
  category: z.string().min(1, "Category required"),
  maxSeats: z.coerce.number().min(1, "At least 1 seat"),
  price: z.coerce.number().min(0, "Price must be 0 or more"),
});

export default function AdminEventsPage() {
  const [search, setSearch] = useState("");
  const { events, isLoading, mutate } = useEvents({ search });
  const [showCreate, setShowCreate] = useState(false);
  const [creating, setCreating] = useState(false);
  const pushToast = uiStore((s) => s.pushToast);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(createSchema) });

  const onCreateEvent = async (data) => {
    setCreating(true);
    try {
      await api.post(endpoints.events.list, data);
      pushToast({ type: "success", message: "Event created!" });
      setShowCreate(false);
      reset();
      mutate();
    } catch {
      // handled
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="font-headline text-headline-lg tracking-tight">
          Events
        </h1>
        <Button size="sm" onClick={() => setShowCreate(true)}>
          <Plus size={16} />
          Create Event
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search events..."
          className="w-full pl-11 pr-4 py-3 bg-surface border border-border rounded-xl text-text-primary text-body-sm placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left px-5 py-3 text-label-sm text-text-muted font-medium">
                  Event
                </th>
                <th className="text-left px-5 py-3 text-label-sm text-text-muted font-medium hidden md:table-cell">
                  Date
                </th>
                <th className="text-left px-5 py-3 text-label-sm text-text-muted font-medium hidden sm:table-cell">
                  Category
                </th>
                <th className="text-left px-5 py-3 text-label-sm text-text-muted font-medium">
                  Seats
                </th>
                <th className="text-right px-5 py-3 text-label-sm text-text-muted font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-border/30">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <td key={j} className="p-5">
                        <Skeleton className="h-4 w-20" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <EmptyState
                      title="No events"
                      description="Create your first event to get started."
                    />
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr
                    key={event._id}
                    className="border-b border-border/30 hover:bg-surface-elevated/50 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <p className="text-body-sm font-medium text-text-primary truncate max-w-[200px]">
                        {event.title}
                      </p>
                    </td>
                    <td className="px-5 py-4 text-body-sm text-text-muted hidden md:table-cell">
                      {formatDate(event.date)}
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className="text-label-sm text-text-muted bg-surface-elevated px-2.5 py-1 rounded-lg">
                        {event.category || "—"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-body-sm text-text-muted">
                      {event.bookedSeats || 0}/{event.maxSeats || 0}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <a
                          href={`/events/${event._id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-elevated transition-colors"
                        >
                          <Eye size={16} />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Event Modal */}
      <Modal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        title="Create Event"
        className="max-w-lg"
      >
        <form onSubmit={handleSubmit(onCreateEvent)} className="space-y-4">
          <Input
            label="Title"
            placeholder="Event name"
            error={errors.title?.message}
            {...register("title")}
          />
          <Input
            label="Description"
            placeholder="Describe your event..."
            error={errors.description?.message}
            {...register("description")}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              type="datetime-local"
              error={errors.date?.message}
              {...register("date")}
            />
            <Input
              label="Venue"
              placeholder="Location"
              error={errors.venue?.message}
              {...register("venue")}
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="Category"
              placeholder="e.g. Music"
              error={errors.category?.message}
              {...register("category")}
            />
            <Input
              label="Max Seats"
              type="number"
              placeholder="100"
              error={errors.maxSeats?.message}
              {...register("maxSeats")}
            />
            <Input
              label="Price ($)"
              type="number"
              placeholder="0"
              error={errors.price?.message}
              {...register("price")}
            />
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" isLoading={creating} className="flex-1">
              Create Event
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowCreate(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
