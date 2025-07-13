"use client";

import { TableMenus } from "@/components/accesos/Table/TableMenus";

const Accesos = () => {
    return (
        <div className="flex flex-col gap-2 w-full h-full">
            <div className="flex flex-row bg-white rounded-lg gap-2 w-full h-1/4">
            </div>
            <div className="w-full h-3/4">
                <TableMenus />
            </div>
        </div>
    )
}

export default Accesos; 