import { useState } from "react";

import Page from "../../../components/Page";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert";

import BookingForm from "../components/BookingForm";
import { useConcertDetailsPage } from "../hooks/useConcertDetailsPage";
import type { BookingFormValues } from "../schemas/booking.schemas";

export default function ConcertDetailsPage() {
  const { concert, canBook, isPending, submitBooking } = useConcertDetailsPage();
  const [error, setError] = useState<string>("");

  const onSubmit = async (values: BookingFormValues) => {
    try {
      setError("");
      await submitBooking(values);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Booking failed");
    }
  };

  return (
    <Page title="Concert details">
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>{concert.title}</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-3 text-sm">
            <div className="grid gap-1">
              <div>
                Artist: <b>{concert.artist}</b> • Genre: <b>{concert.genre}</b>
              </div>
              <div>
                Location: <b>{concert.city}</b> • <b>{concert.venue}</b>
              </div>
              <div>
                Date: <b>{concert.date}</b> • Time:{" "}
                <b>
                  {concert.startTime}–{concert.endTime}
                </b>
              </div>
              <div>
                Price: <b>{concert.price}</b> {concert.currency} • Seats:{" "}
                <b>{concert.availableSeats}</b>
              </div>
              <div>
                Status: <b>{concert.status}</b>
              </div>
              {concert.program && (
                <div>
                  Program: <b>{concert.program}</b>
                </div>
              )}
              {concert.notes && (
                <div>
                  Notes: <b>{concert.notes}</b>
                </div>
              )}
            </div>

            <Separator />

            {error && (
              <Alert variant="destructive">
                <AlertTitle>Booking error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-2">
              <div className="font-medium">Booking</div>
              {!canBook ? (
                <p className="text-muted-foreground">No seats available for this concert.</p>
              ) : (
                <BookingForm onSubmit={onSubmit} disabled={!canBook} isPending={isPending} />
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}