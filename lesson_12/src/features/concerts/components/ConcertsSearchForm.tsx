import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

import {
  concertsSearchSchema,
  type ConcertsSearchFormValues,
} from "../schemas/concerts.schemas";

type Props = {
  values: ConcertsSearchFormValues;
  onSubmit: (values: ConcertsSearchFormValues) => void;
  onReset: () => void;
  isPending?: boolean;
};

const EMPTY: ConcertsSearchFormValues = { city: "", venue: "", date: "" };

export default function ConcertsSearchForm({ values, onSubmit, onReset, isPending }: Props) {
  const { register, handleSubmit, reset } = useForm<ConcertsSearchFormValues>({
    resolver: zodResolver(concertsSearchSchema),
    mode: "onSubmit",
    values: {
      city: values.city ?? "",
      venue: values.venue ?? "",
      date: values.date ?? "",
    },
  });

  const submit = (v: ConcertsSearchFormValues) => {
    onSubmit({
      city: (v.city ?? "").trim(),
      venue: (v.venue ?? "").trim(),
      date: (v.date ?? "").trim(),
    });
  };

  const handleReset = () => {
    reset(EMPTY);
    onReset();
  };

  return (
    <form className="grid gap-4 md:grid-cols-4" onSubmit={handleSubmit(submit)}>
      <div className="grid gap-2">
        <Label>City</Label>
        <Input placeholder="Berlin" autoComplete="off" {...register("city")} />
      </div>

      <div className="grid gap-2">
        <Label>Venue</Label>
        <Input placeholder="Tempodrom" autoComplete="off" {...register("venue")} />
      </div>

      <div className="grid gap-2">
        <Label>Date</Label>
        <Input type="date" autoComplete="off" {...register("date")} />
      </div>

      <div className="grid gap-2 md:items-end">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Searching…" : "Search"}
          </Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset search
          </Button>
        </div>
      </div>
    </form>
  );
}