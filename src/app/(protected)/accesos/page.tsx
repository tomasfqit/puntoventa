"use client";

import { TableMenus } from "@/components/accesos/Table/TableMenus";

const Accesos = () => {
    return (
        <div className="flex flex-col gap-2 w-full h-full">
            <div className="w-full h-1/2">
                <TableMenus />
            </div>
        </div>
    )
}

export default Accesos; 