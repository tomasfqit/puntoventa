import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";

interface FormInputProps<T extends FieldValues> {
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  control: Control<T>;
  type?: "text" | "number";
  toUpperCase?: boolean;
  error?: string;
}

export function FormInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  type = "text",
  toUpperCase = false,
  error,
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <Label htmlFor={name}>{label}</Label>
          <Input
            id={name}
            type={type}
            placeholder={placeholder}
            value={field.value ?? ""}
            onChange={(e) =>
              field.onChange(
                toUpperCase ? e.target.value.toUpperCase() : e.target.value
              )
            }
            className={cn(error && "border border-red-500")}
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
