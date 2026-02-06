import flightsService from "../../../api/flights.service";

export default async function flightItemLoader({
  params,
}: {
  params: { id?: string };
}) {
  const id = params.id;
  if (!id) throw new Error("No flight id");

  try {
    return await flightsService.get(id);
  } catch (err: any) {
    throw new Error(err?.message || "Failed to fetch flight");
  }
}