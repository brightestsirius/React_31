import { Link } from "react-router";

import Page from "../../../components/Page";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

import FlightsSearchForm from "../components/FlightsSearchForm";
import FlightsFiltersBar from "../components/FlightsFiltersBar";

import { useFlightsPage } from "../hooks/useFlightsPage";

export default function FlightsPage() {
  const {
    isPending,
    origin,
    destination,
    departureDate,
    airlines,
    filtered,
    onSearch,
    onResetSearch,
  } = useFlightsPage();

  return (
    <Page title="Flights">
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Search</CardTitle>
          </CardHeader>
          <CardContent>
            <FlightsSearchForm
              defaultValues={{ origin, destination, departureDate }}
              onSubmit={onSearch}
              onReset={onResetSearch}
              isPending={isPending}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <FlightsFiltersBar airlines={airlines} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            {!filtered.length ? (
              <p className="text-sm text-muted-foreground">No flights match your search.</p>
            ) : (
              <div className="grid gap-3">
                {filtered.map((f) => (
                  <div
                    key={f.id}
                    className="flex flex-col gap-2 rounded-md border p-3 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="grid gap-1">
                      <div className="font-medium">
                        {f.origin} → {f.destination} ({f.flightNumber})
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {f.departureDate} • {f.departureTime}–{f.arrivalTime} • {f.airline}
                      </div>
                      <div className="text-sm">
                        Price: <b>{f.price}</b> • Seats: <b>{f.availableSeats}</b>
                      </div>
                    </div>

                    <Button asChild disabled={f.availableSeats <= 0}>
                      <Link to={`/flights/${f.id}`}>Book</Link>
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}