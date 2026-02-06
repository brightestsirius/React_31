import { useMemo, useTransition } from "react";
import { useLoaderData, useNavigate } from "react-router";

import type { Concert } from "../../../api/concerts.types";
import concertsService from "../../../api/concerts.service";
import type { BookingFormValues } from "../schemas/booking.schemas";

export function useConcertDetailsPage() {
  const navigate = useNavigate();
  const concert = useLoaderData() as Concert;
  const [isPending, startTransition] = useTransition();

  const canBook = useMemo(() => concert.availableSeats > 0, [concert.availableSeats]);

  const submitBooking = async (values: BookingFormValues) => {
    const updated = await concertsService.bookOneSeat(concert);

    startTransition(() => {
      navigate("/booking-confirmation", {
        replace: true,
        state: {
          fullName: values.fullName,
          email: values.email,
          concertTitle: updated.title,
          artist: updated.artist,
          city: updated.city,
          venue: updated.venue,
          date: updated.date,
          startTime: updated.startTime,
        },
      });
    });
  };

  return { concert, canBook, isPending, submitBooking };
}