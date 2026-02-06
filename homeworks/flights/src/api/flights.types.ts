export type Flight = {
  id: string;

  flightNumber: string;
  origin: string;
  destination: string;

  departureDate: string;
  departureTime: string;
  arrivalTime: string;

  price: number;
  availableSeats: number;
  airline: string;
};

export type FlightSearchParams = {
  origin: string;
  destination: string;
  departureDate: string;
};