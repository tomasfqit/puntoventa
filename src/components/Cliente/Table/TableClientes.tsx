import InputFilterTable from "@/components/layout/InputFilterTable";
import { Button } from "@/components/ui/button";
import { IViewPersonaClienteList } from "@/models/IPersonaCliente";
import { useClientesList } from "@/services/clientes/useClientesList";
import type { ICellRendererParams } from "ag-grid-community";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Edit, PlusIcon, Trash2 } from "lucide-react";
import { useRef } from "react";

interface PropsTableClientes {
  setOpenModalMant: (item?: IViewPersonaClienteList) => void;
  setOpenModalConfirmarEliminar: (open: boolean) => void;
  setItemSeleccionado: (item?: IViewPersonaClienteList) => void;
}

export const TableClientes = ({
  setOpenModalConfirmarEliminar,
  setItemSeleccionado,
  setOpenModalMant,
}: PropsTableClientes) => {
  const gridRef = useRef<AgGridReact>(null);
  const { data: clientes, isPending } = useClientesList();
  //const { mutate: updateCliente } = useClienteUpdate();

  //   const handleUpdateCliente = (cliente: Cliente) => {
  //     if (!cliente.id) return;
  //     updateCliente(
  //       { cliente, id: cliente.id },
  //       {
  //         onSuccess: () => {
  //           toast.success("Cliente actualizado con exito");
  //         },
  //       }
  //     );
  //   };

  const colDefs: ColDef<IViewPersonaClienteList>[] = [
    { field: "id", headerName: "ID" },
    { field: "identificacion", headerName: "Identificación" },
    { field: "apellidos", headerName: "Apellidos" },
    { field: "nombres", headerName: "Nombres" },
    { field: "telefono", headerName: "Teléfono" },
    { field: "correo", headerName: "Correo" },
    { field: "direccion", headerName: "Dirección" },
    { field: "tipo_cliente", headerName: "Tipo de Cliente" },
    {
      field: "actions",
      headerName: "Acciones",
      filter: false,
      maxWidth: 110,
      pinned: "right",
      cellClass: "flex justify-center items-center",
      cellRenderer: (params: ICellRendererParams<IViewPersonaClienteList>) => {
        return (
          <div className="flex flex-row gap-2">
            <Button
              variant="default"
              size="icon"
              className="size-8"
              onClick={() => {
                setOpenModalMant(params.data);
              }}
            >
              <Edit className="w-4 h-4" />
            </Button>

            <Button
              variant="destructive"
              size="icon"
              className="size-8"
              onClick={() => {
                setOpenModalConfirmarEliminar(true);
                setItemSeleccionado(params.data);
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
          Nuevo Cliente
        </Button>
      </div>
      <div className="ag-theme-alpine w-full h-full">
        <AgGridReact
          ref={gridRef}
          rowData={clientes}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
          loading={isPending}
        />
      </div>
    </div>
  );
};
