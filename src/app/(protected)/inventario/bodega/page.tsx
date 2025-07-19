"use client";

import { FormBodega } from "@/components/inventario/Render/FormBodega";
import { TableBodegas } from "@/components/inventario/Table/TableBodegas";
import { useModal } from "@/hooks/useModal";
import { Bodega } from "@/interfaces/Table";
import { useState } from "react";

const BodegaPage = () => {
  const [itemSeleccionado, setItemSeleccionado] = useState<Bodega>();
  const { openModal } = useModal();

  const handleMantProducto = (itemSeleccionado?: Bodega) => {
    openModal({
      title: "Nuevo Bodega",
      subTitle: "Ingrese los datos del nuevo bodega",
      size: "lg",
      viewFooter: false,
      children: <FormBodega initialData={itemSeleccionado} />,
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full bg-white rounded-md p-4">
      <h2 className="text-2xl font-bold">Bodega</h2>
      <TableBodegas
        itemSeleccionado={itemSeleccionado}
        setItemSeleccionado={setItemSeleccionado}
        setOpenModalMant={handleMantProducto}
      />
    </div>
  );
};

export default BodegaPage;
