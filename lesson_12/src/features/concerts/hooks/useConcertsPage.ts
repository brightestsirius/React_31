import { useDeferredValue, useMemo, useTransition } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router";

import type { Concert } from "../../../api/concerts.types";
import type { ConcertsSearchFormValues } from "../schemas/concerts.schemas";
import { useConcertsFiltersStore } from "../stores/concertsFilters.store";

const norm = (v: string | null) => (v ?? "").trim();

export function useConcertsPage() {
  const allConcerts = useLoaderData() as Concert[];

  const navigate = useNavigate();
  const [sp, setSearchParams] = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const city = norm(sp.get("city"));
  const venue = norm(sp.get("venue"));
  const date = norm(sp.get("date"));

  const { artist, sortBy, searchText } = useConcertsFiltersStore();
  const deferredSearch = useDeferredValue(searchText);

  const artists = useMemo(() => {
    return Array.from(new Set(allConcerts.map((c) => c.artist))).sort();
  }, [allConcerts]);

  const filtered = useMemo(() => {
    const c = city.toLowerCase();
    const v = venue.toLowerCase();

    let res = allConcerts.filter((x) => {
      const okCity = c ? x.city.toLowerCase().includes(c) : true;
      const okVenue = v ? x.venue.toLowerCase().includes(v) : true;
      const okDate = date ? x.date === date : true;
      return okCity && okVenue && okDate;
    });

    if (artist !== "all") res = res.filter((x) => x.artist === artist);

    const s = deferredSearch.trim().toLowerCase();
    if (s) {
      res = res.filter((x) => {
        return (
          x.title.toLowerCase().includes(s) ||
          x.artist.toLowerCase().includes(s) ||
          x.city.toLowerCase().includes(s) ||
          x.venue.toLowerCase().includes(s)
        );
      });
    }

    res = [...res].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return String(a.date).localeCompare(String(b.date));
    });

    return res;
  }, [allConcerts, city, venue, date, artist, sortBy, deferredSearch]);

  const onSearch = (values: ConcertsSearchFormValues) => {
    const params = new URLSearchParams();

    const c = (values.city ?? "").trim();
    const v = (values.venue ?? "").trim();
    const d = (values.date ?? "").trim();

    if (c) params.set("city", c);
    if (v) params.set("venue", v);
    if (d) params.set("date", d);

    startTransition(() => {
      navigate(`/concerts${params.toString() ? `?${params.toString()}` : ""}`);
    });
  };

  const onResetSearch = () => {
    startTransition(() => {
      setSearchParams({}, { replace: true });
    });
  };

  return {
    isPending,
    city,
    venue,
    date,
    artists,
    filtered,
    onSearch,
    onResetSearch,
  };
}