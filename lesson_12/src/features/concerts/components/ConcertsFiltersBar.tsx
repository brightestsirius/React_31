import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

import { useConcertsFiltersStore, type SortBy } from "../stores/concertsFilters.store";

type Props = {
  artists: string[];
};

export default function ConcertsFiltersBar({ artists }: Props) {
  const artist = useConcertsFiltersStore((s) => s.artist);
  const sortBy = useConcertsFiltersStore((s) => s.sortBy);
  const searchText = useConcertsFiltersStore((s) => s.searchText);

  const setArtist = useConcertsFiltersStore((s) => s.setArtist);
  const setSortBy = useConcertsFiltersStore((s) => s.setSortBy);
  const setSearchText = useConcertsFiltersStore((s) => s.setSearchText);
  const reset = useConcertsFiltersStore((s) => s.reset);

  return (
    <div className="grid gap-3 md:grid-cols-4">
      <div className="grid gap-1">
        <label className="text-sm font-medium">Artist</label>
        <select
          className="h-10 rounded-md border bg-background px-3 text-sm"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
        >
          <option value="all">All</option>
          {artists.map((a) => (
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
          onChange={(e) => setSortBy(e.target.value as SortBy)}
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
          placeholder="Title / artist / city / venue…"
        />
      </div>

      <div className="md:col-span-4 flex justify-end">
        <Button type="button" variant="outline" onClick={reset}>
          Reset filters
        </Button>
      </div>
    </div>
  );
}