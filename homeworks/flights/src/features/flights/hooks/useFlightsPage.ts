import { useDeferredValue, useMemo, useTransition } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router";

import type { Flight } from "../../../api/flights.types";
import type { FlightsSearchFormValues } from "../schemas/flights.schemas";
import { useFlightsFiltersStore } from "../stores/flightsFilters.store";

export function useFlightsPage() {
  const allFlights = useLoaderData() as Flight[];

  const navigate = useNavigate();
  const [sp] = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const origin = (sp.get("origin") ?? "").trim();
  const destination = (sp.get("destination") ?? "").trim();
  const departureDate = (sp.get("departureDate") ?? "").trim();

  const { airline, sortBy, searchText } = useFlightsFiltersStore();
  const resetFilters = useFlightsFiltersStore((s) => s.reset);

  const deferredSearch = useDeferredValue(searchText);

  const airlines = useMemo(() => {
    return Array.from(new Set(allFlights.map((f) => f.airline))).sort();
  }, [allFlights]);

  const filtered = useMemo(() => {
    const o = origin.toLowerCase();
    const d = destination.toLowerCase();

    let res = allFlights.filter((f) => {
      const okOrigin = o ? f.origin.toLowerCase() === o : true;
      const okDest = d ? f.destination.toLowerCase() === d : true;
      const okDate = departureDate ? f.departureDate === departureDate : true;
      return okOrigin && okDest && okDate;
    });

    if (airline !== "all") {
      res = res.filter((f) => f.airline === airline);
    }

    const s = deferredSearch.trim().toLowerCase();
    if (s) {
      res = res.filter((f) => {
        return (
          f.flightNumber.toLowerCase().includes(s) ||
          f.origin.toLowerCase().includes(s) ||
          f.destination.toLowerCase().includes(s) ||
          f.airline.toLowerCase().includes(s)
        );
      });
    }

    res = [...res].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return String(a.departureDate).localeCompare(String(b.departureDate));
    });

    return res;
  }, [allFlights, origin, destination, departureDate, airline, sortBy, deferredSearch]);

  const onSearch = (values: FlightsSearchFormValues) => {
    const qs = new URLSearchParams(values).toString();
    startTransition(() => {
      navigate({ pathname: "/flights", search: `?${qs}` });
    });
  };

  const onResetSearch = () => {
    startTransition(() => {
      navigate({ pathname: "/flights" });
    });
    resetFilters();
  };

  return {
    isPending,
    origin,
    destination,
    departureDate,
    airlines,
    filtered,
    onSearch,
    onResetSearch,
  };
}