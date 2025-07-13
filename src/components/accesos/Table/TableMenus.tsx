import { Menu } from '@/interfaces/Table';
import { useMenuList } from '@/services/menus/useMenuList';
import { ColDef } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';

export const TableMenus = () => {

    const { data: menus } = useMenuList();

    const colDefs: ColDef<Menu>[] = [
        { field: "titulo", headerName: "Nombre" },
        { field: "path", headerName: "URL" },
        { field: "icono", headerName: "Icono" },
        { field: "grupo_id", headerName: "Orden" },
    ];

    const defaultColDef = {
        flex: 1,
    };

    // Container: Defines the grid's theme & dimensions.
    return (
        <div className='w-full h-[70vh]'>
            <AgGridReact
                rowData={menus}
                columnDefs={colDefs}
                defaultColDef={defaultColDef}
            />
        </div>
    );
};