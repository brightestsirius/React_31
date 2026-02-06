import type { LoaderFunctionArgs } from "react-router";
import concertsService from "../../../api/concerts.service";

export default async function concertItemLoader({ params }: LoaderFunctionArgs) {
  const id = params.id;
  if (!id) throw new Error("Concert id is missing");
  return await concertsService.get(id);
}