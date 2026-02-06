import { isRouteErrorResponse, useRouteError, Link } from "react-router";

import Page from "../components/Page";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";

export default function ErrorPage() {
  const err = useRouteError();

  const title = "Something went wrong";
  const message = isRouteErrorResponse(err)
    ? `${err.status} ${err.statusText}`
    : err instanceof Error
      ? err.message
      : "Unknown error";

  return (
    <Page title="Error">
      <div className="mx-auto max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 text-sm">
            <p className="text-muted-foreground">{message}</p>
            <Button asChild variant="outline">
              <Link to="/flights">Back to flights</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}