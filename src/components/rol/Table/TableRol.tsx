import InputFilterTable from "@/components/layout/InputFilterTable";
import { Button } from "@/components/ui/button";
import { IDBTableRol } from "@/interfaces/Table";
import { useRolList } from "@/services/rol/useRolList";
import type { ICellRendererParams } from "ag-grid-community";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Edit, PlusIcon, Trash2 } from "lucide-react";
import { useRef } from "react";

interface PropsTableRol {
  setOpenModalEditar?: (open: boolean) => void;
  setOpenModalConfirmarEliminar?: (open: boolean) => void;
  setItemSeleccionado: (item?: IDBTableRol) => void;
  setOpenModalMant: (open: boolean) => void;
  itemSeleccionado?: IDBTableRol;
}

export const TableRolUI = ({
  setOpenModalConfirmarEliminar,
  setItemSeleccionado,
  setOpenModalMant,
}: PropsTableRol) => {
  const gridRef = useRef<AgGridReact>(null);
  const { data: menus, isPending } = useRolList();

  const colDefs: ColDef<IDBTableRol>[] = [
    { field: "nombre", headerName: "Nombre" },
    { field: "descripcion", headerName: "Descripción" },
    { field: "created_at", headerName: "Creado" },
    { field: "updated_at", headerName: "Actualizado" },
    {
      field: "actions",
      headerName: "Acciones",
      filter: false,
      maxWidth: 110,
      pinned: "right",
      cellClass: "flex justify-center items-center",
      cellRenderer: (params: ICellRendererParams<IDBTableRol>) => {
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
    <div className="flex flex-col p-2 rounded-md gap-2 w-full h-full">
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
          Nuevo
        </Button>
      </div>
      <div className="ag-theme-alpine w-full h-full">
        <AgGridReact
          ref={gridRef}
          rowData={menus}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          loading={isPending}
        />
      </div>
    </div>
  );
};
