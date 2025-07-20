"use client";

import { FormAlmacen } from "@/components/inventario/Render/FormAlmacen";
import { TableAlmacen } from "@/components/inventario/Table/TableAlmacen";
import { ModalConfirmarEliminar } from "@/components/layout/ModalConfirmarEliminar";
import { CustomToastSonner } from "@/helpers/CustomToastSonner";
import { useModal } from "@/hooks/useModal";
import { Almacen } from "@/interfaces/Table";
import { useAlmacenDelete } from "@/services/almacen/useAlmacenDelete";
import { useState } from "react";

const AlmacenPage = () => {
  const { mutate: deleteAlmacen } = useAlmacenDelete();
  const [itemSeleccionado, setItemSeleccionado] = useState<Almacen>();
  const [openModalConfirmarEliminar, setOpenModalConfirmarEliminar] =
    useState(false);
  const { openModal } = useModal();

  const handleMantAlmacen = (itemSeleccionado?: Almacen) => {
    openModal({
      title: "Nuevo Almacen",
      subTitle: "Ingrese los datos del nuevo almacen",
      size: "md",
      viewFooter: false,
      children: <FormAlmacen initialData={itemSeleccionado} />,
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full bg-white rounded-md p-4">
      <h2 className="text-2xl font-bold">Almacenes</h2>
      <TableAlmacen
        itemSeleccionado={itemSeleccionado}
        setItemSeleccionado={setItemSeleccionado}
        setOpenModalMant={handleMantAlmacen}
        setOpenModalConfirmarEliminar={setOpenModalConfirmarEliminar}
      />
      {openModalConfirmarEliminar && itemSeleccionado?.id && (
        <ModalConfirmarEliminar
          title="¿Estás seguro de querer eliminar este producto?"
          message={`Esta acción no se puede deshacer. Esto eliminará permanentemente el producto ${itemSeleccionado.nombre}`}
          open={openModalConfirmarEliminar}
          onOpenChange={setOpenModalConfirmarEliminar}
          onConfirm={() =>
            deleteAlmacen(itemSeleccionado?.id || 0, {
              onSuccess: () => {
                CustomToastSonner.success("Almacen eliminado con exito");
                setOpenModalConfirmarEliminar(false);
              },
            })
          }
        />
      )}
    </div>
  );
};

export default AlmacenPage;
