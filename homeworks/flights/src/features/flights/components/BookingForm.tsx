import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { bookingSchema, type BookingFormValues } from "../schemas/booking.schemas";

import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Checkbox } from "../../../components/ui/checkbox";

type Props = {
  onSubmit: (values: BookingFormValues) => Promise<void> | void;
  disabled?: boolean;
  isPending?: boolean;
};

export default function BookingForm({ onSubmit, disabled, isPending }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { fullName: "", email: "", phoneNumber: "", confirmAgreement: false },
  });

  const agree = watch("confirmAgreement");

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <Label>Full name</Label>
        <Input {...register("fullName")} placeholder="Taras Shevchenko" />
        {errors.fullName && <p className="text-sm text-red-600">{errors.fullName.message}</p>}
      </div>

      <div className="grid gap-2">
        <Label>Email</Label>
        <Input {...register("email")} placeholder="taras@example.com" />
        {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div className="grid gap-2">
        <Label>Phone (optional)</Label>
        <Input {...register("phoneNumber")} placeholder="+38..." />
      </div>

      <div className="flex items-start gap-2">
        <Checkbox
          checked={agree}
          onCheckedChange={(v) => setValue("confirmAgreement", v === true, { shouldValidate: true })}
        />
        <div className="grid gap-1">
          <Label className="leading-5">I agree with booking terms</Label>
          {errors.confirmAgreement && (
            <p className="text-sm text-red-600">{errors.confirmAgreement.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={disabled || isPending}>
        {isPending ? "Booking…" : "Confirm booking"}
      </Button>
    </form>
  );
}