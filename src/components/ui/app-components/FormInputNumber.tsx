import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

interface FormInputNumberProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  control: Control<T>;
  error?: string;
  register: UseFormRegister<T>;
}

export function FormInputNumber<T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  error,
  register,
}: FormInputNumberProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState }) => (
        <div className="space-y-2">
          <Label htmlFor={name}>{label}</Label>
          <Input
            type="number"
            {...register(name, { min: 0, valueAsNumber: true })}
            className={cn(error && "border border-red-500")}
            placeholder={placeholder}
          />
          {fieldState.error && (
            <p className="text-sm text-destructive">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
