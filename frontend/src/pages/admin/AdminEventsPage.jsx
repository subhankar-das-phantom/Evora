import { useState } from "react";
import useSWR, { mutate } from "swr";
import { Plus, Trash2, Pencil } from "lucide-react";
import { api, fetcher } from "@/api/axios";
import { uiStore } from "@/store/uiStore";
import { DataTable } from "@/components/ui/DataTable";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";

export default function AdminEventsPage() {
  const adminEventsKey = "/events/admin/all?limit=100";
  const { data: responseData, isLoading } = useSWR(adminEventsKey, fetcher);
  const pushToast = uiStore((s) => s.pushToast);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingEventId, setEditingEventId] = useState(null);
  
  const defaultFormData = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    venue: "",
    category: "TECHNOLOGY",
    maxSeats: 100,
    banner: ""
  };
  const [formData, setFormData] = useState(defaultFormData);

  const events = responseData?.items || responseData?.events || [];

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) return;
    
    try {
      await api.delete(`/events/${eventId}`);
      pushToast({ type: "success", message: "Event deleted successfully." });
      mutate(adminEventsKey);
    } catch (error) {
      // Error handled by interceptor
    }
  };

  const handleEditClick = (event) => {
    setFormData({
      title: event.title,
      description: event.description,
      startDate: event.startDate ? event.startDate.slice(0, 16) : "",
      endDate: event.endDate ? event.endDate.slice(0, 16) : "",
      venue: event.venue,
      category: event.category,
      maxSeats: event.maxSeats,
      banner: event.banner || ""
    });
    setEditingEventId(event._id);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingEventId(null);
    setFormData(defaultFormData);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEventId(null);
    setFormData(defaultFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const title = formData.title.trim();
      const description = formData.description.trim();
      const venue = formData.venue.trim();
      const category = formData.category.trim();
      const banner = formData.banner.trim();
      const maxSeats = Number(formData.maxSeats);
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);

      if (title.length < 3) {
        pushToast({ type: "error", message: "title: Title must be at least 3 characters." });
        return;
      }
      if (description.length < 20) {
        pushToast({ type: "error", message: "description: Description must be at least 20 characters." });
        return;
      }
      if (venue.length < 2) {
        pushToast({ type: "error", message: "venue: Venue must be at least 2 characters." });
        return;
      }
      if (!Number.isInteger(maxSeats) || maxSeats < 1) {
        pushToast({ type: "error", message: "maxSeats: Max seats must be a whole number of at least 1." });
        return;
      }
      if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
        pushToast({ type: "error", message: "startDate: Start and end date must be valid." });
        return;
      }
      if (endDate < startDate) {
        pushToast({ type: "error", message: "endDate: End date must be after start date." });
        return;
      }

      const payload = {
        title,
        description,
        venue,
        category,
        maxSeats,
        banner: banner || undefined,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      };
      
      if (!editingEventId) {
        payload.status = "PUBLISHED";
      }

      if (editingEventId) {
        await api.patch(`/events/${editingEventId}`, payload);
        pushToast({ type: "success", message: "Event updated successfully." });
      } else {
        await api.post("/events", payload);
        pushToast({ type: "success", message: "Event created successfully." });
      }
      
      closeModal();
      mutate(adminEventsKey);
    } catch (error) {
      // Error handled by interceptor
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    { header: "Title", accessor: "title" },
    { header: "Location", accessor: "venue" },
    { 
      header: "Status", 
      render: (row) => (
        <span className="inline-flex items-center rounded-full bg-evora-primary/10 px-2.5 py-0.5 text-xs font-semibold text-evora-primary">
          {row.status || "Upcoming"}
        </span>
      )
    },
    { 
      header: "Seats", 
      render: (row) => `${row.bookedSeats || 0}/${row.maxSeats}`
    },
    {
      header: "Actions",
      render: (row) => (
        <div className="flex items-center gap-2">
          <button 
            onClick={() => handleEditClick(row)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-evora-primary transition-colors hover:bg-evora-primary/10"
            title="Edit Event"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button 
            onClick={() => handleDelete(row._id)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-500/10"
            title="Delete Event"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-evora-text-primary">Manage Events</h1>
          <p className="mt-1 text-sm text-evora-text-secondary">Create, modify, and remove events from the platform.</p>
        </div>
        <Button onClick={openCreateModal} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Event
        </Button>
      </div>

      {isLoading ? (
        <Skeleton className="h-64 w-full" />
      ) : (
        <DataTable columns={columns} data={events} keyField="_id" />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingEventId ? "Edit Event" : "Create New Event"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Event Title" 
            placeholder="e.g. Future of Tech Summit"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-evora-text-primary">Description</label>
            <textarea
              required
              className="flex w-full rounded-xl border border-evora-border bg-evora-surface-secondary px-4 py-2 text-sm text-evora-text-primary placeholder:text-evora-text-muted focus:border-evora-primary focus:outline-none focus:ring-2 focus:ring-evora-primary/20 min-h-[100px]"
              placeholder="Detailed description of the event..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Start Date" 
              type="datetime-local" 
              required
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            />
            <Input 
              label="End Date" 
              type="datetime-local" 
              required
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            />
          </div>

          <Input 
            label="Venue" 
            placeholder="City, Venue or 'Online'"
            required
            value={formData.venue}
            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
          />

          <Input 
            label="Banner URL (Optional)" 
            placeholder="https://example.com/image.jpg"
            value={formData.banner}
            onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-evora-text-primary">Category</label>
              <select
                className="flex h-12 w-full rounded-xl border border-evora-border bg-evora-surface-secondary px-4 text-sm text-evora-text-primary focus:border-evora-primary focus:outline-none focus:ring-2 focus:ring-evora-primary/20"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="TECHNOLOGY">Technology</option>
                <option value="BUSINESS">Business</option>
                <option value="DESIGN">Design</option>
                <option value="NETWORKING">Networking</option>
              </select>
            </div>
            <Input 
              label="Max Seats" 
              type="number" 
              min="1"
              required
              value={formData.maxSeats}
              onChange={(e) => setFormData({ ...formData, maxSeats: e.target.value })}
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button type="button" variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : editingEventId ? "Save Changes" : "Create Event"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
