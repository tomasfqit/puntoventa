"use client";

import { FormProducto } from "@/components/inventario/Render/FormProducto";
import { TableProductos } from "@/components/inventario/Table/TableProductos";
import { useModal } from "@/hooks/useModal";
import { Producto } from "@/interfaces/Table";
import { useState } from "react";

const ProductosPage = () => {
  const [itemSeleccionado, setItemSeleccionado] = useState<Producto>();
  const { openModal } = useModal();

  const handleMantProducto = (itemSeleccionado?: Producto) => {
    openModal({
      title: "Nuevo Producto",
      subTitle: "Ingrese los datos del nuevo producto",
      size: "lg",
      viewFooter: false,
      children: <FormProducto initialData={itemSeleccionado} />,
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full bg-white rounded-md p-4">
      <h2 className="text-2xl font-bold">Productos</h2>
      <TableProductos
        itemSeleccionado={itemSeleccionado}
        setItemSeleccionado={setItemSeleccionado}
        setOpenModalMant={handleMantProducto}
      />
    </div>
  );
};

export default ProductosPage;
