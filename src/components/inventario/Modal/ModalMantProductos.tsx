"use client";

import { CustomModal } from "@/components/ui/CustomModal";
import { Producto } from "@/interfaces/Table";
interface ConfirmDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  subTitle?: string;
  itemSeleccionado?: Producto;
}

export const ModalMantProductos = ({
  open,
  onOpenChange,
  title = "Nuevo Producto",
  subTitle = "Ingrese los datos del nuevo producto",
  itemSeleccionado,
}: ConfirmDeleteDialogProps) => {
  console.log("itemSeleccionado =>", itemSeleccionado);
  return (
    <CustomModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      subTitle={subTitle}
      size="md"
    >
      <div className="flex w-full h-full"></div>
    </CustomModal>
  );
};
