"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface DropdownOption {
  label: string;
  value: number;
}

interface CustomDropDownProps {
  options: DropdownOption[];
  value?: number;
  onValueChange: (value: number) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function CustomDropDownNumber({
  options,
  value,
  onValueChange,
  placeholder = "Seleccionar opción...",
  className,
  disabled = false,
}: CustomDropDownProps) {
  return (
    <Select
      value={value?.toString()}
      onValueChange={(newValue) => onValueChange(parseInt(newValue))}
      disabled={disabled}
    >
      <SelectTrigger className={cn("w-full", className)}>
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
  );
}
