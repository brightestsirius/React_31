import axios from "axios";
import type { Concert } from "./concerts.types";

const API = "https://694eda01b5bc648a93c1705e.mockapi.io/concerts";

const concertsService = {
  get: (id: string): Promise<Concert> =>
    axios.get<Concert>(`${API}/${id}`).then(({ data }) => data),

  list: (): Promise<Concert[]> =>
    axios.get<Concert[]>(API).then(({ data }) => data),

  put: (obj: Concert): Promise<Concert> =>
    axios.put<Concert>(`${API}/${obj.id}`, obj).then(({ data }) => data),

  bookOneSeat: async (concert: Concert): Promise<Concert> => {
    if (concert.availableSeats <= 0) throw new Error("No seats available");
    const updated: Concert = { ...concert, availableSeats: concert.availableSeats - 1 };
    return concertsService.put(updated);
  },
};

export default concertsService;