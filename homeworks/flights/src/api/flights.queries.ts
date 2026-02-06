import { queryOptions } from "@tanstack/react-query";
import flightsService from "./flights.service";
import type { FlightSearchParams } from "./flights.types";

export const flightsKeys = {
  all: ["flights"] as const,
  list: (params: FlightSearchParams) => ["flights", "list", params] as const,
  details: (id: string) => ["flights", "details", id] as const,
};

export const flightsListQuery = (params: FlightSearchParams) =>
  queryOptions({
    queryKey: flightsKeys.list(params),
    queryFn: () => flightsService.list(params),
    staleTime: 60_000,
  });

export const flightDetailsQuery = (id: string) =>
  queryOptions({
    queryKey: flightsKeys.details(id),
    queryFn: () => flightsService.get(id),
    staleTime: 60_000,
  });