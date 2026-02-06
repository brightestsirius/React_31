import { useMemo, useTransition } from "react";
import { useLoaderData, useNavigate } from "react-router";

import type { Flight } from "../../../api/flights.types";
import flightsService from "../../../api/flights.service";
import type { BookingFormValues } from "../schemas/booking.schemas";

export function useFlightDetailsPage() {
  const navigate = useNavigate();
  const flight = useLoaderData() as Flight;
  const [isPending, startTransition] = useTransition();

  const canBook = useMemo(() => flight.availableSeats > 0, [flight.availableSeats]);

  const submitBooking = async (values: BookingFormValues) => {
    const updated = await flightsService.bookOneSeat(flight);

    startTransition(() => {
      navigate("/booking-confirmation", {
        replace: true,
        state: {
          fullName: values.fullName,
          email: values.email,
          flightNumber: updated.flightNumber,
          origin: updated.origin,
          destination: updated.destination,
          departureDate: updated.departureDate,
        },
      });
    });
  };

  return { flight, canBook, isPending, submitBooking };
}