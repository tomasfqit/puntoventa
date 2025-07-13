import InputFilterTable from "@/components/InputFilterTable";
import { Button } from "@/components/ui/button";
import { Menu } from "@/interfaces/Table";
import { useMenuList } from "@/services/menus/useMenuList";
import type { ICellRendererParams } from "ag-grid-community";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { Edit, PlusIcon, Trash2 } from "lucide-react";
import { useRef } from "react";
interface ITableMenus extends Menu {
    actions: React.ReactNode;
}

export const TableMenus = () => {
    const gridRef = useRef<AgGridReact>(null);

    const { data: menus } = useMenuList(); // sin filtro, todo el dataset

    const colDefs: ColDef<ITableMenus>[] = [
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
                            console.log(params.data);
                        }}>
                            <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="destructive" size="icon" className="size-8">
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                );
            }
        }
    ];

    const defaultColDef = {
        flex: 1,
        filter: true, // opcional si quieres también column filter
    };



    return (
        <div className="flex flex-col p-2 bg-white rounded-md gap-2 w-full h-full">
            <div className="flex flex-row gap-2">
                <InputFilterTable gridRef={gridRef} />
                <Button variant="default">
                    <PlusIcon className="w-4 h-4" />
                    Nuevo
                </Button>
            </div>

            {/* 🔧 Importante: aplicar el theme aquí */}
            <div className="ag-theme-alpine w-full h-[calc(100vh-200px)]">
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
