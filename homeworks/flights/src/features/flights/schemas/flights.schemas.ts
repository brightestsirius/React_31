import { z } from "zod";

export const flightsSearchSchema = z.object({
  origin: z.string().min(1, "Required"),
  destination: z.string().min(1, "Required"),
  departureDate: z.string().min(1, "Required"),
});

export type FlightsSearchFormValues = z.infer<typeof flightsSearchSchema>;