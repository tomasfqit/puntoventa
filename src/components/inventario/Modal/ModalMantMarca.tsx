"use client";

import { CustomModal } from "@/components/ui/CustomModal";
import { Producto } from "@/interfaces/Table";
import { FormProducto } from "../Render/FormProducto";
interface ConfirmDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  subTitle?: string;
  itemSeleccionado?: Producto;
}

export const ModalMantMarca = ({
  open,
  onOpenChange,
  title = "Nueva Marca",
  subTitle = "Ingrese los datos de la nueva marca",
  itemSeleccionado,
}: ConfirmDeleteDialogProps) => {
  console.log("itemSeleccionado =>", itemSeleccionado);
  return (
    <CustomModal
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      subTitle={subTitle}
      size="lg"
      viewFooter={false}
    >
      <div className="flex w-full h-full">
        <FormProducto initialData={itemSeleccionado} />
      </div>
    </CustomModal>
  );
};
