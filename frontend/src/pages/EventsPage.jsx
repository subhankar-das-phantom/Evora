import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { EventCard } from "@/components/cards/EventCard";
import { EventCardSkeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { useEvents } from "@/hooks/useEvents";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/utils/cn";

const categoryOptions = [
  "All",
  "Music",
  "Technology",
  "Business",
  "Art",
  "Sports",
  "Food & Drink",
];

const sortOptions = [
  { value: "latest", label: "Latest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

export default function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "All"
  );
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);

  const params = useMemo(() => {
    const p = { page, limit: 9 };
    if (search) p.search = search;
    if (activeCategory !== "All") p.category = activeCategory;
    if (sort === "price_asc") p.sortBy = "price";
    if (sort === "price_desc") {
      p.sortBy = "price";
      p.order = "desc";
    }
    return p;
  }, [search, activeCategory, sort, page]);

  const { events, meta, isLoading, error } = useEvents(params);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setPage(1);
    if (cat !== "All") {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <div className="pt-8 pb-24 px-4 sm:px-6 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <div className="pt-4 sm:pt-8">
        <h1 className="font-headline text-display-md tracking-tight mb-2 text-3xl sm:text-4xl md:text-5xl font-bold">
          Discover Events
        </h1>
        <p className="text-text-muted text-body-lg">
          Find your next extraordinary experience
        </p>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search events by name, category, or location..."
          className="w-full pl-12 pr-4 py-3.5 bg-surface border border-border rounded-xl text-text-primary text-body-md placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary hover:border-border-hover transition-all duration-200"
          id="event-search"
        />
      </form>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categoryOptions.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-label-md font-medium whitespace-nowrap transition-all duration-200 shrink-0",
                activeCategory === cat
                  ? "bg-primary text-white shadow-glow-sm"
                  : "bg-surface border border-border text-text-muted hover:border-border-hover hover:text-text-primary"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="bg-surface border border-border rounded-xl px-4 py-2.5 text-body-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/40 cursor-pointer"
          id="sort-select"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Event Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      ) : events.length === 0 ? (
        <EmptyState
          title="No events found"
          description="Try adjusting your search or filters to find what you're looking for."
          action={() => {
            setSearch("");
            setActiveCategory("All");
            setSort("latest");
            setPage(1);
            setSearchParams({});
          }}
          actionLabel="Clear filters"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {meta && meta.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-xl text-label-md bg-surface border border-border text-text-muted hover:text-text-primary hover:border-border-hover disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>
          {Array.from({ length: meta.totalPages }, (_, i) => i + 1).map(
            (p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={cn(
                  "w-10 h-10 rounded-xl text-label-md font-medium transition-all",
                  p === page
                    ? "bg-primary text-white"
                    : "bg-surface border border-border text-text-muted hover:text-text-primary hover:border-border-hover"
                )}
              >
                {p}
              </button>
            )
          )}
          <button
            onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
            disabled={page === meta.totalPages}
            className="px-4 py-2 rounded-xl text-label-md bg-surface border border-border text-text-muted hover:text-text-primary hover:border-border-hover disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
