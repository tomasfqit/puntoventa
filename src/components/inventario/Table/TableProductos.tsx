import InputFilterTable from "@/components/layout/InputFilterTable";
import { Button } from "@/components/ui/button";
import { Producto } from "@/interfaces/Table";
import { useProductoUpdate } from "@/services/productos/useProductoUpdate";
import { useProductosList } from "@/services/productos/useProductosList";
import type { ICellRendererParams, NewValueParams } from "ag-grid-community";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Edit, PlusIcon, Trash2 } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

interface PropsTableMenus {
  setOpenModalMant: (item?: Producto) => void;
  setItemSeleccionado: (item?: Producto) => void;
  setOpenModalConfirmarEliminar: (open: boolean) => void;
}

export const TableProductos = ({
  setItemSeleccionado,
  setOpenModalMant,
  setOpenModalConfirmarEliminar,
}: PropsTableMenus) => {
  const gridRef = useRef<AgGridReact>(null);
  const { data: productos, isPending } = useProductosList();
  const { mutate: updateProducto } = useProductoUpdate();
  const handleUpdateProducto = (producto: Producto) => {
    updateProducto(
      { producto, id: producto.id },
      {
        onSuccess: () => {
          toast.success("Producto actualizado con exito");
        },
      }
    );
  };

  const colDefs: ColDef<Producto>[] = [
    { field: "nombre", headerName: "Nombre" },
    { field: "descripcion", headerName: "Descripción" },
    {
      field: "precio_venta",
      headerName: "Precio Venta",
      editable: true,
      onCellValueChanged(event: NewValueParams<Producto>) {
        handleUpdateProducto(event.data);
      },
    },
    {
      field: "precio_compra",
      headerName: "Precio Compra",
      editable: true,
      onCellValueChanged(event: NewValueParams<Producto>) {
        handleUpdateProducto(event.data);
      },
    },
    {
      field: "stock",
      headerName: "Stock",
    },
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
                console.log("params =>", params.data);
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
