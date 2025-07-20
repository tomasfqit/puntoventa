"use client";

import { FormBodega } from "@/components/inventario/Render/FormBodega";
import { TableBodegas } from "@/components/inventario/Table/TableBodegas";
import { ModalConfirmarEliminar } from "@/components/layout/ModalConfirmarEliminar";
import { useModal } from "@/hooks/useModal";
import { useQueryParams } from "@/hooks/useQueryParams";
import { Bodega } from "@/interfaces/Table";
import { useBodegaDelete } from "@/services/bodegas/useBodegaDelete";
import { useState } from "react";
import { toast } from "sonner";

const BodegaPage = () => {
  const { mutate: deleteBodega } = useBodegaDelete();
  const [openModalConfirmarEliminar, setOpenModalConfirmarEliminar] =
    useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState<Bodega>();
  const { openModal } = useModal();
  const { setParams } = useQueryParams();

  const handleMantProducto = (itemSeleccionado?: Bodega) => {
    setParams({ bodega_id: itemSeleccionado?.id || 0 });
    openModal({
      title: itemSeleccionado ? "Editar Bodega" : "Nueva Bodega",
      subTitle: itemSeleccionado
        ? "Modifica los datos de la bodega"
        : "Ingrese los datos del nuevo bodega",
      size: "md",
      viewFooter: false,
      children: <FormBodega initialData={itemSeleccionado} />,
    });
  };
  return (
    <div className="flex flex-col gap-4 w-full h-full bg-white rounded-md p-4">
      <h2 className="text-2xl font-bold">Bodega</h2>
      <TableBodegas
        setItemSeleccionado={setItemSeleccionado}
        setOpenModalMant={handleMantProducto}
        setOpenModalConfirmarEliminar={setOpenModalConfirmarEliminar}
      />
      {openModalConfirmarEliminar && itemSeleccionado?.id && (
        <ModalConfirmarEliminar
          title="¿Estás seguro de querer eliminar este producto?"
          message={`Esta acción no se puede deshacer. Esto eliminará permanentemente el producto ${itemSeleccionado.nombre}`}
          open={openModalConfirmarEliminar}
          onOpenChange={setOpenModalConfirmarEliminar}
          onConfirm={() =>
            deleteBodega(itemSeleccionado?.id || 0, {
              onSuccess: () => {
                toast.success("Bodega eliminado con exito");
                setOpenModalConfirmarEliminar(false);
              },
            })
          }
        />
      )}
    </div>
  );
};

export default BodegaPage;
