export type ConcertStatus = "On Sale" | "Sold Out" | "Cancelled";

export type Concert = {
  id: string;
  title: string;
  artist: string;
  genre: string;
  city: string;
  venue: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  currency: string;
  availableSeats: number;
  status: ConcertStatus;
  program?: string;
  notes?: string;
};