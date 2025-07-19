"use client";

import { ModalMantMarca } from "@/components/inventario/Modal/ModalMantMarca";
import { ModalMantProductos } from "@/components/inventario/Modal/ModalMantProductos";
import { TableProductos } from "@/components/inventario/Table/TableProductos";
import { Producto } from "@/interfaces/Table";
import { useState } from "react";

const ProductosPage = () => {
  const [itemSeleccionado, setItemSeleccionado] = useState<Producto>();
  const [openModalMant, setOpenModalMant] = useState(false);
  const [openModalMantMarca, setOpenModalMantMarca] = useState(false);

  return (
    <div className="flex flex-col gap-4 w-full h-full bg-white rounded-md p-4">
      <h2 className="text-2xl font-bold">Productos</h2>
      <TableProductos
        itemSeleccionado={itemSeleccionado}
        setItemSeleccionado={setItemSeleccionado}
        setOpenModalMant={setOpenModalMant}
      />
      {openModalMantMarca && (
        <ModalMantMarca
          open={openModalMantMarca}
          onOpenChange={setOpenModalMantMarca}
        />
      )}
      {openModalMant && (
        <ModalMantProductos
          open={openModalMant}
          onOpenChange={setOpenModalMant}
        />
      )}
    </div>
  );
};

export default ProductosPage;
