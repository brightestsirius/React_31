import { Link } from "react-router";

import Page from "../../../components/Page";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";

import ConcertsSearchForm from "../components/ConcertsSearchForm";
import ConcertsFiltersBar from "../components/ConcertsFiltersBar";

import { useConcertsPage } from "../hooks/useConcertsPage";

export default function ConcertsPage() {
  const { isPending, city, venue, date, artists, filtered, onSearch, onResetSearch } =
    useConcertsPage();

  return (
    <Page title="Concerts">
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Search</CardTitle>
          </CardHeader>
          <CardContent>
            <ConcertsSearchForm
              values={{ city, venue, date }}
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
            <ConcertsFiltersBar artists={artists} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            {!filtered.length ? (
              <p className="text-sm text-muted-foreground">No concerts match your search.</p>
            ) : (
              <div className="grid gap-3">
                {filtered.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-col gap-2 rounded-md border p-3 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="grid gap-1">
                      <div className="font-medium">
                        {c.city} • {c.venue} ({c.title})
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {c.date} • {c.startTime}–{c.endTime} • {c.artist}
                      </div>
                      <div className="text-sm">
                        Price: <b>{c.price}</b> • Seats: <b>{c.availableSeats}</b>
                      </div>
                    </div>

                    <Button asChild disabled={c.availableSeats <= 0}>
                      <Link to={`/concerts/${c.id}`}>Book</Link>
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