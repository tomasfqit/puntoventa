import InputFilterTable from "@/components/layout/InputFilterTable";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import {
  IPersonaCliente,
  IViewPersonaClienteList,
} from "@/models/IPersonaCliente";
import { useClientesList } from "@/services/clientes/useClientesList";
import { useClienteUpdate } from "@/services/clientes/useClientesUpdate";
import type { ICellRendererParams } from "ag-grid-community";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Edit, PlusIcon, Trash2 } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";
import { BuscarClienteByIdentificacion } from "../Render/BuscarClienteByIdentificacion";

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
  const { mutate: updateCliente } = useClienteUpdate();
  const { openModal } = useModal();

  const handleUpdateCliente = (cliente: IViewPersonaClienteList) => {
    const clientePersona: IPersonaCliente = {
      nombres: cliente.nombres,
      apellidos: cliente.apellidos,
      identificacion: cliente.identificacion,
      telefono: cliente.telefono,
      correo: cliente.correo,
      direccion: cliente.direccion,
      cliente: {
        persona_id: cliente.persona_id,
        tipo_cliente: cliente.tipo_cliente,
      },
    };
    if (!cliente.id) return;
    updateCliente(
      {
        clientePersona,
        persona_id: cliente.persona_id,
        cliente_id: cliente.id,
      },
      {
        onSuccess: () => {
          toast.success("Cliente actualizado con exito");
        },
      }
    );
  };

  const colDefs: ColDef<IViewPersonaClienteList>[] = [
    { field: "id", headerName: "ID" },
    { field: "identificacion", headerName: "Identificación" },
    {
      field: "apellidos",
      headerName: "Apellidos",
      editable: true,
      valueFormatter: ({ value }) => value?.toUpperCase?.(),
      onCellValueChanged: (params) => {
        handleUpdateCliente(params.data);
      },
    },
    {
      field: "nombres",
      headerName: "Nombres",
      editable: true,
      valueFormatter: ({ value }) => value?.toUpperCase?.(),
      onCellValueChanged: (params) => {
        handleUpdateCliente(params.data);
      },
    },
    {
      field: "telefono",
      headerName: "Teléfono",
      editable: true,
      onCellValueChanged: (params) => {
        handleUpdateCliente(params.data);
      },
    },
    {
      field: "correo",
      headerName: "Correo",
      editable: true,
      onCellValueChanged: (params) => {
        handleUpdateCliente(params.data);
      },
    },
    {
      field: "direccion",
      headerName: "Dirección",
      editable: true,
      valueFormatter: ({ value }) => value?.toUpperCase?.(),
      onCellValueChanged: (params) => {
        handleUpdateCliente(params.data);
      },
    },
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

  const handleBuscarCliente = () => {
    openModal({
      title: "Ingresar Identificación Cliente",
      children: <BuscarClienteByIdentificacion />,
      size: "sm",
    });
  };

  return (
    <div className="flex flex-col p-2 bg-white rounded-md gap-2 w-full h-[70vh]">
      <div className="flex flex-row gap-2">
        <InputFilterTable gridRef={gridRef} />
        <Button variant="default" onClick={handleBuscarCliente}>
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
