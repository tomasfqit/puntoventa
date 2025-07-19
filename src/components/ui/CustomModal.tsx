"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./button";

interface ConfirmDeleteDialogProps {
  children: React.ReactNode;
  title?: string;
  subTitle?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  size?: "sm" | "md" | "lg";
  viewFooter?: boolean;
}

export const CustomModal = ({
  children,
  title,
  subTitle,
  open,
  onOpenChange,
  size = "md",
  viewFooter = true,
}: ConfirmDeleteDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`flex flex-col min-w-[${size === "sm" ? "30" : size === "md" ? "50" : "70"}vw] h-[95vh]`}
      >
        <DialogHeader className="flex flex-col gap-2 border-b border-gray-200 pb-2">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subTitle}</DialogDescription>
        </DialogHeader>
        <div className="flex w-full h-full">{children}</div>
        {viewFooter && (
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button variant="default" onClick={() => onOpenChange(false)}>
              Guardar
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
