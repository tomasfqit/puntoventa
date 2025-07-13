import InputFilterTable from "@/components/InputFilterTable";
import { Button } from "@/components/ui/button";
import { useMenuList } from "@/services/menus/useMenuList";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { PlusIcon } from "lucide-react";
import { useRef } from "react";


export const TableMenus = () => {
    const gridRef = useRef<AgGridReact>(null);

    const { data: menus } = useMenuList(); // sin filtro, todo el dataset

    const colDefs: ColDef[] = [
        { field: "titulo", headerName: "Nombre" },
        { field: "path", headerName: "URL" },
        { field: "icono", headerName: "Icono" },
        { field: "grupo_id", headerName: "Orden" },
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
