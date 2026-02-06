import { Link, useLocation } from "react-router";

import Page from "../../../components/Page";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

type BookingState = {
  fullName?: string;
  email?: string;
  flightNumber?: string;
  origin?: string;
  destination?: string;
  departureDate?: string;
};

export default function BookingConfirmationPage() {
  const location = useLocation();
  const state = (location.state ?? {}) as BookingState;

  return (
    <Page title="Booking confirmed">
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>✅ Booking confirmed</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-3 text-sm">
            <p className="text-muted-foreground">
              Thank you{state.fullName ? `, ${state.fullName}` : ""}!  
              Your booking was successful.
            </p>

            {state.flightNumber && (
              <div className="rounded-md border p-3 text-sm">
                <div>
                  <b>Flight:</b> {state.flightNumber}
                </div>
                <div>
                  <b>Route:</b> {state.origin} → {state.destination}
                </div>
                <div>
                  <b>Date:</b> {state.departureDate}
                </div>
                {state.email && (
                  <div>
                    <b>Email:</b> {state.email}
                  </div>
                )}
              </div>
            )}

            <Button asChild className="mt-2">
              <Link to="/flights">Back to flights</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}