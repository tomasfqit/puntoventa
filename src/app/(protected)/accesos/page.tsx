"use client";

import { ModalMantRol } from "@/components/rol/Modal/ModalMantRol";
import { TableRolUI } from "@/components/rol/Table/TableRol";
import { useState } from "react";

const Accesos = () => {
  const [openModalMant, setOpenModalMant] = useState(false);

  return (
    <div className="container mx-full p-4 h-full bg-white rounded-md">
      <TableRolUI
        setOpenModalMant={setOpenModalMant}
        setItemSeleccionado={() => {}}
      />
      {openModalMant && (
        <ModalMantRol
          title="Mantenimiento de roles"
          subtitle="Ingrese los datos del rol"
          open={openModalMant}
          onOpenChange={setOpenModalMant}
        />
      )}
    </div>
  );
};

export default Accesos;
