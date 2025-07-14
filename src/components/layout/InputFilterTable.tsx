import { AgGridReact } from "ag-grid-react";
import { RefObject } from "react";
import { Input } from "../ui/input";

interface InputFilterTableProps {
    gridRef: RefObject<AgGridReact<unknown> | null>;
}

const InputFilterTable = ({ gridRef }: InputFilterTableProps) => {
    const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        gridRef.current!.api.setGridOption(
            "quickFilterText",
            e.target.value
        );
    }
    return (
        <Input
            type="text"
            placeholder="Buscar"
            onChange={handleFilter}
        />
    )
}

export default InputFilterTable;