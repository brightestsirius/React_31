import { useTransition } from "react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useFlightsFiltersStore, type SortBy } from "../stores/flightsFilters.store";

type Props = {
  airlines: string[];
};

export default function FlightsFiltersBar({ airlines }: Props) {
  const {
    airline,
    sortBy,
    searchText,
    setAirline,
    setSortBy,
    setSearchText,
    reset,
  } = useFlightsFiltersStore();

  const [isPending, startTransition] = useTransition();

  const onAirlineChange = (v: string) => startTransition(() => setAirline(v));
  const onSortChange = (v: SortBy) => startTransition(() => setSortBy(v));

  return (
    <div className="grid gap-3 md:grid-cols-4">
      <div className="grid gap-1">
        <label className="text-sm font-medium">Airline</label>
        <select
          className="h-10 rounded-md border bg-background px-3 text-sm"
          value={airline}
          onChange={(e) => onAirlineChange(e.target.value)}
        >
          <option value="all">All</option>
          {airlines.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-1">
        <label className="text-sm font-medium">Sort</label>
        <select
          className="h-10 rounded-md border bg-background px-3 text-sm"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value as SortBy)}
        >
          <option value="date-asc">Date ↑</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
        </select>
      </div>

      <div className="grid gap-1 md:col-span-2">
        <label className="text-sm font-medium">Search in results</label>
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Flight number / city / airline…"
        />
        {isPending && <span className="text-xs text-muted-foreground">Updating…</span>}
      </div>

      <div className="md:col-span-4">
        <Button variant="outline" size="sm" onClick={reset}>
          Reset filters
        </Button>
      </div>
    </div>
  );
}