"use client";
import { ModalMantMenu } from "@/components/accesos/Modal/ModalMantMenu";
import { TableMenus } from "@/components/accesos/Table/TableMenus";
import { ModalConfirmarEliminar } from "@/components/layout/ModalConfirmarEliminar";
import { Menu } from "@/interfaces/Table";
import { useState } from "react";

const Accesos = () => {

    const [openModalConfirmarEliminar, setOpenModalConfirmarEliminar] = useState(false);
    const [openModalMant, setOpenModalMant] = useState(false);
    const [itemSeleccionado, setItemSeleccionado] = useState<Menu>();

    return (
        <div className="flex flex-col gap-2 w-full h-full">
            {/* <div className="flex flex-row bg-white rounded-lg gap-2 w-full h-1/4">
            </div> */}
            <div className="w-full h-3/4">
                <TableMenus
                    setOpenModalConfirmarEliminar={setOpenModalConfirmarEliminar}
                    setItemSeleccionado={setItemSeleccionado}
                    setOpenModalMant={setOpenModalMant} />
            </div>
            {itemSeleccionado && openModalConfirmarEliminar && (
                <ModalConfirmarEliminar
                    open={openModalConfirmarEliminar}
                    onOpenChange={setOpenModalConfirmarEliminar}
                    onConfirm={() => {
                        console.log(itemSeleccionado);
                    }}
                />
            )}
            {openModalMant && (
                <ModalMantMenu
                    open={openModalMant}
                    onOpenChange={setOpenModalMant}
                    itemSeleccionado={itemSeleccionado}
                    onConfirm={() => { }}
                />
            )}

        </div>
    )
}

export default Accesos; 