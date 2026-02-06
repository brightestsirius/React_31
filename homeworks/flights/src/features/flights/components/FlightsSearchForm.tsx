import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

import {
  flightsSearchSchema,
  type FlightsSearchFormValues,
} from "../schemas/flights.schemas";

type Props = {
  defaultValues?: Partial<FlightsSearchFormValues>;
  onSubmit: (values: FlightsSearchFormValues) => void;
  onReset: () => void;
  isPending?: boolean;
};

export default function FlightsSearchForm({
  defaultValues,
  onSubmit,
  onReset,
  isPending,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FlightsSearchFormValues>({
    resolver: zodResolver(flightsSearchSchema),
    defaultValues: {
      origin: defaultValues?.origin ?? "",
      destination: defaultValues?.destination ?? "",
      departureDate: defaultValues?.departureDate ?? "",
    },
  });

  const handleReset = () => {
    reset({ origin: "", destination: "", departureDate: "" });
    onReset();
  };

  return (
    <form className="grid gap-4 md:grid-cols-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <Label>Origin</Label>
        <Input placeholder="Kyiv" {...register("origin")} />
        {errors.origin && <p className="text-sm text-red-600">{errors.origin.message}</p>}
      </div>

      <div className="grid gap-2">
        <Label>Destination</Label>
        <Input placeholder="Berlin" {...register("destination")} />
        {errors.destination && (
          <p className="text-sm text-red-600">{errors.destination.message}</p>
        )}
      </div>

      <div className="grid gap-2">
        <Label>Departure date</Label>
        <Input type="date" {...register("departureDate")} />
        {errors.departureDate && (
          <p className="text-sm text-red-600">{errors.departureDate.message}</p>
        )}
      </div>

      <div className="grid gap-2 md:items-end">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Searching…" : "Search"}
          </Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
}