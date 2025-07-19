"use client";

import { ModalConfirmarEliminar } from "@/components/layout/ModalConfirmarEliminar";
import { ModalMantRol } from "@/components/rol/Modal/ModalMantRol";
import { TableRolUI } from "@/components/rol/Table/TableRol";
import { IDBTableRol } from "@/interfaces/Table";
import { useRolDelete } from "@/services/rol/useRolDelete";
import { useState } from "react";

const Accesos = () => {
  const [openModalMant, setOpenModalMant] = useState(false);
  const [openModalConfirmarEliminar, setOpenModalConfirmarEliminar] =
    useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState<IDBTableRol>();
  const { mutate: deleteRol } = useRolDelete();

  const onConfirmarEliminar = () => {
    if (!itemSeleccionado?.id) return;
    deleteRol(itemSeleccionado.id, {
      onSuccess: () => {
        setOpenModalConfirmarEliminar(false);
      },
    });
  };

  return (
    <div className="container mx-full p-4 h-full bg-white rounded-md">
      <TableRolUI
        setOpenModalMant={setOpenModalMant}
        setItemSeleccionado={setItemSeleccionado}
        itemSeleccionado={itemSeleccionado}
        setOpenModalConfirmarEliminar={setOpenModalConfirmarEliminar}
      />
      {openModalMant && (
        <ModalMantRol
          title="Mantenimiento de roles"
          subtitle="Ingrese los datos del rol"
          open={openModalMant}
          onOpenChange={setOpenModalMant}
        />
      )}
      {openModalConfirmarEliminar && (
        <ModalConfirmarEliminar
          title="Eliminar rol"
          message={`¿Estás seguro de querer eliminar este rol ${itemSeleccionado?.nombre}?`}
          open={openModalConfirmarEliminar}
          onOpenChange={setOpenModalConfirmarEliminar}
          onConfirm={onConfirmarEliminar}
        />
      )}
    </div>
  );
};

export default Accesos;
