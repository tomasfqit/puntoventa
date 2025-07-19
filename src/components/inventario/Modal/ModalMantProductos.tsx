"use client";

import { Producto } from "@/interfaces/Table";
import { FormProducto } from "../Render/FormProducto";
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
  itemSeleccionado,
}: ConfirmDeleteDialogProps) => {
  console.log("itemSeleccionado =>", open);
  return (
    <FormProducto
      initialData={itemSeleccionado}
      onCloseModal={() => {
        console.log("variables =>");
        onOpenChange(false);
      }}
    />
  );
};
