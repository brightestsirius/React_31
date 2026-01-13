import React from "react";
import { useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <h1>Oops!</h1>
      <p>{error.message}</p>
    </>
  );
}
