import { useState } from "react";
import useSWR from "swr";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { EventCard } from "@/components/ui/EventCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { fetcher } from "@/api/axios"; // Assuming an axios fetcher is set up

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const { data, error, isLoading } = useSWR(`/events?search=${search}`, fetcher);

  const events = data?.items || data?.events || [];

  return (
    <div className="container-content space-y-12">
      {/* Header & Search */}
      <div className="flex flex-col space-y-6 md:flex-row md:items-end md:justify-between md:space-y-0">
        <div>
          <h1 className="font-display text-4xl font-semibold text-evora-text-primary">Discover Events</h1>
          <p className="mt-2 text-evora-text-secondary">Find your next premium experience.</p>
        </div>
        
        <div className="w-full md:max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-evora-text-muted" />
            <Input 
              placeholder="Search events..." 
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col overflow-hidden rounded-2xl bg-evora-surface-secondary shadow-soft border border-evora-border">
              <Skeleton className="aspect-[4/3] w-full rounded-none" />
              <div className="flex flex-col p-5">
                <Skeleton className="h-6 w-3/4 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          ))
        ) : error ? (
          <div className="col-span-full">
            <EmptyState title="Failed to load events" description="Please try again later." />
          </div>
        ) : events.length === 0 ? (
          <div className="col-span-full">
            <EmptyState title="No events found" description="Try adjusting your search criteria." />
          </div>
        ) : (
          events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))
        )}
      </div>
    </div>
  );
}
