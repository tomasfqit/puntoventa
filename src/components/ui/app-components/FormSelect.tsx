import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface Option {
  label: string;
  value: number;
}

interface FormSelectProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  control: Control<T>;
  options: Option[];
  placeholder?: string;
  error?: string;
}

export function FormSelect<T extends FieldValues>({
  name,
  label,
  control,
  options,
  placeholder = "Seleccionar",
  error,
}: FormSelectProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <Label htmlFor={name}>{label}</Label>
          <Select
            value={field.value ? String(field.value) : ""}
            onValueChange={(val) => field.onChange(Number(val))}
          >
            <SelectTrigger
              className={cn("w-full", error && "border border-red-500")}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value.toString()}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

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
