"use client";

import { ModalMantProductos } from "@/components/inventario/Modal/ModalMantProductos";
import { TableProductos } from "@/components/inventario/Table/TableProductos";
import { Button } from "@/components/ui/button";
import { Producto } from "@/interfaces/Table";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

const ProductosPage = () => {
  const [itemSeleccionado, setItemSeleccionado] = useState<Producto>();
  const [openModalMant, setOpenModalMant] = useState(false);

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      ProductosPage
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white rounded-md p-4">
        <Button variant="ghost" className="border border-gray-200">
          <PlusIcon className="size-4" />
          Nueva Marca
        </Button>
        <Button variant="ghost" className="border border-gray-200">
          <PlusIcon className="size-4" />
          Nueva Categoría
        </Button>
        <Button variant="ghost" className="border border-gray-200">
          <PlusIcon className="size-4" />
          Nuevo Modelo
        </Button>
      </div>
      <TableProductos
        itemSeleccionado={itemSeleccionado}
        setItemSeleccionado={setItemSeleccionado}
        setOpenModalMant={setOpenModalMant}
      />
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
