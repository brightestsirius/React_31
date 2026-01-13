import React from "react";
import { useFetcher } from "react-router";

export default function form() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="post">
      <label>
        Title: <input type="text" name="title" />
      </label>
      <label>
        Completed: <input type="checkbox" name="completed" />
      </label>
      <button>Submit</button>
    </fetcher.Form>
  );
}
