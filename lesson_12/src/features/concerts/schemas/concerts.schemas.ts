import { z } from "zod";

export const concertsSearchSchema = z.object({
  city: z.string().optional(),
  venue: z.string().optional(),
  date: z.string().optional(),
});

export type ConcertsSearchFormValues = z.infer<typeof concertsSearchSchema>;