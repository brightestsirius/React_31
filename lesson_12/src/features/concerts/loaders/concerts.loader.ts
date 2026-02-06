import type { LoaderFunctionArgs } from "react-router";
import concertsService from "../../../api/concerts.service";

export default async function concertsLoader(_args: LoaderFunctionArgs) {
  return await concertsService.list();
}