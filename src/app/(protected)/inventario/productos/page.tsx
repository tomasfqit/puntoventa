"use client";

import { ModalMantProductos } from "@/components/inventario/Modal/ModalMantProductos";
import { TableProductos } from "@/components/inventario/Table/TableProductos";
import { Producto } from "@/interfaces/Table";
import { useState } from "react";

const ProductosPage = () => {
  const [itemSeleccionado, setItemSeleccionado] = useState<Producto>();
  const [openModalMant, setOpenModalMant] = useState(false);

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      ProductosPage
      <TableProductos
        itemSeleccionado={itemSeleccionado}
        setItemSeleccionado={setItemSeleccionado}
        setOpenModalMant={setOpenModalMant}
      />
      {openModalMant && (
        <ModalMantProductos
          open={openModalMant}
          onOpenChange={setOpenModalMant}
          onConfirm={() => {}}
        />
      )}
    </div>
  );
};

export default ProductosPage;
