import { queryOptions } from "@tanstack/react-query";
import concertsService from "./concerts.service";
import type { ConcertSearchParams } from "./concerts.types";

export const concertsKeys = {
  all: ["concerts"] as const,
  list: (params: ConcertSearchParams) => ["concerts", "list", params] as const,
  details: (id: string) => ["concerts", "details", id] as const,
};

export const concertsListQuery = (params: ConcertSearchParams) =>
  queryOptions({
    queryKey: concertsKeys.list(params),
    queryFn: () => concertsService.list(params),
    staleTime: 60_000,
  });

export const flightDetailsQuery = (id: string) =>
  queryOptions({
    queryKey: concertsKeys.details(id),
    queryFn: () => concertsService.get(id),
    staleTime: 60_000,
  });