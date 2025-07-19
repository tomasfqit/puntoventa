import InputFilterTable from "@/components/layout/InputFilterTable";
import { Button } from "@/components/ui/button";
import { Producto } from "@/interfaces/Table";
import { useProductosList } from "@/services/productos/useProductosList";
import type { ICellRendererParams } from "ag-grid-community";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Edit, PlusIcon, Trash2 } from "lucide-react";
import { useRef } from "react";

interface PropsTableMenus {
  setOpenModalEditar?: (open: boolean) => void;
  setOpenModalConfirmarEliminar?: (open: boolean) => void;
  setItemSeleccionado: (item?: Producto) => void;
  setOpenModalMant: (open: boolean) => void;
  itemSeleccionado?: Producto;
}

export const TableProductos = ({
  setOpenModalConfirmarEliminar,
  setItemSeleccionado,
  setOpenModalMant,
}: PropsTableMenus) => {
  const gridRef = useRef<AgGridReact>(null);
  const { data: productos, isPending } = useProductosList();

  const colDefs: ColDef<Producto>[] = [
    { field: "nombre", headerName: "Nombre" },
    { field: "descripcion", headerName: "Descripción" },
    { field: "precio", headerName: "Precio" },
    { field: "stock", headerName: "Stock" },
    {
      field: "actions",
      headerName: "Acciones",
      filter: false,
      maxWidth: 110,
      pinned: "right",
      cellClass: "flex justify-center items-center",
      cellRenderer: (params: ICellRendererParams<Producto>) => {
        return (
          <div className="flex flex-row gap-2">
            <Button
              variant="default"
              size="icon"
              className="size-8"
              onClick={() => {
                setItemSeleccionado?.(params.data!);
                setOpenModalMant(true);
              }}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              className="size-8"
              onClick={() => {
                setOpenModalConfirmarEliminar?.(true);
                setItemSeleccionado?.(params.data!);
              }}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const defaultColDef = {
    flex: 1,
    filter: true,
  };

  return (
    <div className="flex flex-col p-2 bg-white rounded-md gap-2 w-full h-[400px]">
      <div className="flex flex-row gap-2">
        <InputFilterTable gridRef={gridRef} />
        <Button
          variant="default"
          onClick={() => {
            setItemSeleccionado(undefined);
            setOpenModalMant(true);
          }}
        >
          <PlusIcon className="w-4 h-4" />
          Nuevo Producto
        </Button>
      </div>
      <div className="ag-theme-alpine w-full h-full">
        <AgGridReact
          ref={gridRef}
          rowData={productos}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          loading={isPending}
        />
      </div>
    </div>
  );
};
