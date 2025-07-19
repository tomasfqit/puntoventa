"use client";

import { FormProducto } from "@/components/inventario/Render/FormProducto";
import { TableProductos } from "@/components/inventario/Table/TableProductos";
import { useModal } from "@/hooks/useModal";

const ProductosPage = () => {
  const { openModal } = useModal();

  const handleOpenModalProducto = () => {
    openModal({
      title: "Nuevo Producto",
      subTitle: "Ingrese los datos del nuevo producto",
      size: "lg",
      viewFooter: false,
      children: <FormProducto />,
    });
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full bg-white rounded-md p-4">
      <h2 className="text-2xl font-bold">Productos</h2>
      <TableProductos
        itemSeleccionado={undefined}
        setItemSeleccionado={() => {}}
        setOpenModalMant={handleOpenModalProducto}
      />
    </div>
  );
};

export default ProductosPage;
