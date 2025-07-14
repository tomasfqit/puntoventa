import InputFilterTable from "@/components/layout/InputFilterTable";
import { Button } from "@/components/ui/button";
import { Menu } from "@/interfaces/Table";
import { ITableMenus } from "@/interfaces/TableActionsProps";
import { useMenuList } from "@/services/menus/useMenuList";
import type { ICellRendererParams } from "ag-grid-community";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Edit, PlusIcon, Trash2 } from "lucide-react";
import { useRef } from "react";


interface PropsTableMenus {
    setOpenModalEditar?: (open: boolean) => void;
    setOpenModalConfirmarEliminar?: (open: boolean) => void;
    setItemSeleccionado: (item?: ITableMenus) => void;
    setOpenModalMant: (open: boolean) => void;
    itemSeleccionado?: ITableMenus;
}

export const TableMenus = ({ setOpenModalConfirmarEliminar, setItemSeleccionado, setOpenModalMant }: PropsTableMenus) => {
    const gridRef = useRef<AgGridReact>(null);
    const { data: menus } = useMenuList();

    const colDefs: ColDef<Menu>[] = [
        { field: "titulo", headerName: "Nombre" },
        { field: "path", headerName: "URL" },
        { field: "icono", headerName: "Icono" },
        { field: "grupo_id", headerName: "Orden" },
        {
            field: "actions",
            headerName: "Acciones",
            filter: false,
            maxWidth: 110,
            pinned: "right",
            cellClass: "flex justify-center items-center",
            cellRenderer: (params: ICellRendererParams<ITableMenus>) => {
                return (
                    <div className="flex flex-row gap-2">
                        <Button variant="default" size="icon" className="size-8" onClick={() => {
                            setItemSeleccionado?.(params.data!);
                            setOpenModalMant(true);
                        }}>
                            <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="icon" className="size-8" onClick={() => {
                            setOpenModalConfirmarEliminar?.(true);
                            setItemSeleccionado?.(params.data!);
                        }}>
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                );
            }
        }
    ];

    const defaultColDef = {
        flex: 1,
        filter: true,
    };



    return (
        <div className="flex flex-col p-2 bg-white rounded-md gap-2 w-full h-full">
            <div className="flex flex-row gap-2">
                <InputFilterTable gridRef={gridRef} />
                <Button variant="default" onClick={() => {
                    setItemSeleccionado(undefined);
                    setOpenModalMant(true);
                }}>
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
                />
            </div>

        </div>
    );
};
