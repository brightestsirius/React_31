import { Link, useLocation } from "react-router";

import Page from "../../../components/Page";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

type BookingState = {
  fullName?: string;
  email?: string;
  concertTitle?: string;
  artist?: string;
  city?: string;
  venue?: string;
  date?: string;
  startTime?: string;
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
              Thank you{state.fullName ? `, ${state.fullName}` : ""}! Your booking was successful.
            </p>

            {state.concertTitle && (
              <div className="rounded-md border p-3">
                <div>
                  <b>Concert:</b> {state.concertTitle}
                </div>
                {state.artist && (
                  <div>
                    <b>Artist:</b> {state.artist}
                  </div>
                )}
                {state.city && state.venue && (
                  <div>
                    <b>Location:</b> {state.city} • {state.venue}
                  </div>
                )}
                {state.date && (
                  <div>
                    <b>Date:</b> {state.date} {state.startTime ? `• ${state.startTime}` : ""}
                  </div>
                )}
                {state.email && (
                  <div>
                    <b>Email:</b> {state.email}
                  </div>
                )}
              </div>
            )}

            <Button asChild className="mt-2">
              <Link to="/concerts">Back to concerts</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}