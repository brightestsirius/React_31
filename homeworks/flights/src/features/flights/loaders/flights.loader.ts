import flightsService from "../../../api/flights.service";

export default async function flightsLoader() {
  try {
    return await flightsService.list();
  } catch (err: any) {
    throw new Error(err?.message || "Failed to fetch flights");
  }
}