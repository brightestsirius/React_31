import { useState } from "react";

import Page from "../../../components/Page";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Separator } from "../../../components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert";

import BookingForm from "../components/BookingForm";
import { useFlightDetailsPage } from "../hooks/useFlightDetailsPage";

export default function FlightDetailsPage() {
  const { flight, canBook, isPending, submitBooking } = useFlightDetailsPage();
  const [error, setError] = useState<string>("");

  const onSubmit = async (values: any) => {
    try {
      setError("");
      await submitBooking(values);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Booking failed");
    }
  };

  return (
    <Page title="Flight details">
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>
              {flight.origin} → {flight.destination}
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-3 text-sm">
            <div className="grid gap-1">
              <div>
                Flight: <b>{flight.flightNumber}</b> • Airline: <b>{flight.airline}</b>
              </div>
              <div>
                Date: <b>{flight.departureDate}</b> • Time:{" "}
                <b>
                  {flight.departureTime}–{flight.arrivalTime}
                </b>
              </div>
              <div>
                Price: <b>{flight.price}</b> {flight.currency ?? ""} • Seats:{" "}
                <b>{flight.availableSeats}</b>
              </div>
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
                <p className="text-muted-foreground">No seats available for this flight.</p>
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