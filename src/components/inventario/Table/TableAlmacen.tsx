import InputFilterTable from "@/components/layout/InputFilterTable";
import { Button } from "@/components/ui/button";
import { Almacen } from "@/interfaces/Table";
import { useAlmacenList } from "@/services/almacen/useAlmacenList";
import { useAlmacenUpdate } from "@/services/almacen/useAlmacenUpdate";
import type { ICellRendererParams, NewValueParams } from "ag-grid-community";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Edit, PlusIcon, Trash2 } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

interface PropsTableAlmacen {
  setOpenModalMant: (item?: Almacen) => void;
  setOpenModalConfirmarEliminar: (open: boolean) => void;
  setItemSeleccionado: (item?: Almacen) => void;
  itemSeleccionado?: Almacen;
}

export const TableAlmacen = ({
  setOpenModalConfirmarEliminar,
  setItemSeleccionado,
  setOpenModalMant,
}: PropsTableAlmacen) => {
  const gridRef = useRef<AgGridReact>(null);
  const { data: almacenes, isPending } = useAlmacenList();
  const { mutate: updateAlmacen } = useAlmacenUpdate();

  const handleUpdateAlmacen = (almacen: Almacen) => {
    if (!almacen.id) return;
    updateAlmacen(
      { almacen, id: almacen.id },
      {
        onSuccess: () => {
          toast.success("Almacen actualizado con exito");
        },
      }
    );
  };

  const colDefs: ColDef<Almacen>[] = [
    { field: "nombre", headerName: "Nombre" },
    {
      field: "direccion",
      headerName: "Dirección",
      editable: true,
      onCellValueChanged(event: NewValueParams<Almacen>) {
        handleUpdateAlmacen(event.data);
      },
    },
    {
      field: "actions",
      headerName: "Acciones",
      filter: false,
      maxWidth: 110,
      pinned: "right",
      cellClass: "flex justify-center items-center",
      cellRenderer: (params: ICellRendererParams<Almacen>) => {
        return (
          <div className="flex flex-row gap-2">
            <Button
              variant="default"
              size="icon"
              className="size-8"
              onClick={() => {
                setItemSeleccionado(params.data!);
                setOpenModalMant(params.data!);
              }}
            >
              <Edit className="w-4 h-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              className="size-8"
              onClick={() => {
                setItemSeleccionado(params.data);
                setOpenModalConfirmarEliminar(true);
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
    <div className="flex flex-col p-2 bg-white rounded-md gap-2 w-full h-[70vh]">
      <div className="flex flex-row gap-2">
        <InputFilterTable gridRef={gridRef} />
        <Button
          variant="default"
          onClick={() => {
            setOpenModalMant();
          }}
        >
          <PlusIcon className="w-4 h-4" />
          Nuevo Almacen
        </Button>
      </div>
      <div className="ag-theme-alpine w-full h-full">
        <AgGridReact
          ref={gridRef}
          rowData={almacenes}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          loading={isPending}
        />
      </div>
    </div>
  );
};
