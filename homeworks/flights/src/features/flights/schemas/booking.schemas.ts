import { z } from "zod";

export const bookingSchema = z.object({
  fullName: z.string().min(2, "Required"),
  email: z.string().email("Invalid email"),
  phoneNumber: z.string().optional(),
  confirmAgreement: z.literal(true, {
    errorMap: () => ({ message: "You must agree to continue" }),
  }),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;