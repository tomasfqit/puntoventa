// components/shared/KeyValueSelector.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export interface KeyValue {
  label: string;
  value: number;
}

interface KeyValueSelectorProps {
  data: KeyValue[];
  isMulti?: boolean;
  defaultValue?: KeyValue | KeyValue[] | null;
  placeholder?: string;
  onChange: (selected: KeyValue | KeyValue[] | null) => void;
}

export const KeyValueSelector = ({
  data,
  isMulti = false,
  defaultValue = null,
  placeholder = "Seleccionar...",
  onChange,
}: KeyValueSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<KeyValue[]>(
    defaultValue
      ? Array.isArray(defaultValue)
        ? defaultValue
        : [defaultValue]
      : []
  );

  useEffect(() => {
    if (isMulti) {
      onChange(selected);
    } else {
      onChange(selected[0] ?? null);
    }
  }, [selected]);

  const toggleSelection = (item: KeyValue) => {
    if (isMulti) {
      setSelected((prev) =>
        prev.find((i) => i.value === item.value)
          ? prev.filter((i) => i.value !== item.value)
          : [...prev, item]
      );
    } else {
      setSelected([item]);
      setOpen(false);
    }
  };

  const isSelected = (item: KeyValue) =>
    selected.some((i) => i.value === item.value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-start text-left")}
        >
          {selected.length === 0
            ? placeholder
            : isMulti
              ? selected.map((s) => s.label).join(", ")
              : selected[0].label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-2">
        <ScrollArea className="h-60 pr-2">
          <ul className="space-y-1">
            {data.map((item) => (
              <li
                key={item.value}
                className="flex items-center space-x-2 cursor-pointer hover:bg-muted px-2 py-1 rounded"
                onClick={() => toggleSelection(item)}
              >
                {isMulti && <Checkbox checked={isSelected(item)} disabled />}
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
