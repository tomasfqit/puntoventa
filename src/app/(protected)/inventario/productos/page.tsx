"use client";

import { FormProducto } from "@/components/inventario/Render/FormProducto";
import { TableProductos } from "@/components/inventario/Table/TableProductos";
import { ModalConfirmarEliminar } from "@/components/layout/ModalConfirmarEliminar";
import { useModal } from "@/hooks/useModal";
import { Producto } from "@/interfaces/Table";
import { useProductoDelete } from "@/services/productos/useProductoDelete";
import { useState } from "react";
import { toast } from "sonner";

const ProductosPage = () => {
  const { mutate: deleteProducto } = useProductoDelete();
  const [itemSeleccionado, setItemSeleccionado] = useState<Producto>();
  const [openModalConfirmarEliminar, setOpenModalConfirmarEliminar] =
    useState(false);
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
        setItemSeleccionado={setItemSeleccionado}
        setOpenModalMant={handleMantProducto}
        setOpenModalConfirmarEliminar={setOpenModalConfirmarEliminar}
      />
      {openModalConfirmarEliminar && itemSeleccionado && (
        <ModalConfirmarEliminar
          title="¿Estás seguro de querer eliminar este producto?"
          message={`Esta acción no se puede deshacer. Esto eliminará permanentemente el producto ${itemSeleccionado.nombre}`}
          open={openModalConfirmarEliminar}
          onOpenChange={setOpenModalConfirmarEliminar}
          onConfirm={() =>
            deleteProducto(itemSeleccionado?.id, {
              onSuccess: () => {
                toast.success("Producto eliminado con exito");
                setOpenModalConfirmarEliminar(false);
              },
            })
          }
        />
      )}
    </div>
  );
};

export default ProductosPage;
