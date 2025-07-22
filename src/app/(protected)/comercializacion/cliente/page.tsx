"use client";

import { FormMantCliente } from "@/components/Cliente/Form/FormMantCliente";
import { TableClientes } from "@/components/Cliente/Table/TableClientes";
import { ModalConfirmarEliminar } from "@/components/layout/ModalConfirmarEliminar";
import { CustomToastSonner } from "@/helpers/CustomToastSonner";
import { useModal } from "@/hooks/useModal";
import { useQueryParams } from "@/hooks/useQueryParams";
import { IViewPersonaClienteList } from "@/models/IPersonaCliente";
import { useClienteDelete } from "@/services/clientes/useClientesDelete";
import { useState } from "react";

const ClientePage = () => {
  const { mutate: deleteCliente } = useClienteDelete();
  const [itemSeleccionado, setItemSeleccionado] =
    useState<IViewPersonaClienteList>();
  const [openModalConfirmarEliminar, setOpenModalConfirmarEliminar] =
    useState(false);
  const { openModal } = useModal();
  const { setParams } = useQueryParams();

  const handleMantCliente = (itemSeleccionado?: IViewPersonaClienteList) => {
    if (itemSeleccionado) {
      setParams({
        cliente_id: itemSeleccionado.id || 0,
        persona_id: itemSeleccionado.persona_id || 0,
      });
    }
    openModal({
      title: "Nuevo Cliente",
      subTitle: "Ingrese los datos del nuevo cliente",
      size: "md",
      viewFooter: false,
      children: <FormMantCliente initialData={itemSeleccionado} />,
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full bg-white rounded-md p-4">
      <h2 className="text-2xl font-bold">Clientes</h2>
      <TableClientes
        setItemSeleccionado={setItemSeleccionado}
        setOpenModalMant={handleMantCliente}
        setOpenModalConfirmarEliminar={setOpenModalConfirmarEliminar}
      />
      {openModalConfirmarEliminar && itemSeleccionado?.id && (
        <ModalConfirmarEliminar
          title="¿Estás seguro de querer eliminar este producto?"
          message={`Esta acción no se puede deshacer. Esto eliminará permanentemente el producto ${itemSeleccionado.nombres} ${itemSeleccionado.apellidos}`}
          open={openModalConfirmarEliminar}
          onOpenChange={setOpenModalConfirmarEliminar}
          onConfirm={() =>
            deleteCliente(itemSeleccionado?.id || 0, {
              onSuccess: () => {
                CustomToastSonner.success("Cliente eliminado con exito");
                setOpenModalConfirmarEliminar(false);
              },
            })
          }
        />
      )}
    </div>
  );
};

export default ClientePage;
