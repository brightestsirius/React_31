import axios from "axios";
import type { Flight } from "./flights.types";

const API = "https://694eda01b5bc648a93c1705e.mockapi.io/flights";

const flightsService = {
  get: (id: string): Promise<Flight> =>
    axios.get<Flight>(`${API}/${id}`).then(({ data }) => data),

  list: (): Promise<Flight[]> =>
    axios.get<Flight[]>(API).then(({ data }) => data),

  put: (obj: Flight): Promise<Flight> =>
    axios.put<Flight>(`${API}/${obj.id}`, obj).then(({ data }) => data),

  bookOneSeat: async (flight: Flight): Promise<Flight> => {
    if (flight.availableSeats <= 0) throw new Error("No seats available");
    const updated: Flight = { ...flight, availableSeats: flight.availableSeats - 1 };
    return flightsService.put(updated);
  },
};

export default flightsService;