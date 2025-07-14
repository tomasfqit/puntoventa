"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Menu } from "@/interfaces/Table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { MenuForm } from "../Render/FormMenu";

interface ConfirmDeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title?: string;
    subTitle?: string;
    itemSeleccionado?: Menu;
}

export const ModalMantMenu = ({
    open,
    onOpenChange,
    onConfirm,
    title = "Nuevo Menú",
    subTitle = "Ingrese los datos del nuevo menú",
    itemSeleccionado,
}: ConfirmDeleteDialogProps) => {

    console.log('itemSeleccionado =>', itemSeleccionado);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex flex-col min-w-[70vw] h-[85vh]">
                <DialogHeader className="flex flex-col gap-2 border-b border-gray-200 pb-2">
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{subTitle}</DialogDescription>
                </DialogHeader>
                <div className="flex w-full h-full">
                    <Tabs defaultValue="account" className="w-full h-full">
                        <TabsList className="flex flex-row gap-2 border border-gray-200 rounded-lg p-1" >
                            <TabsTrigger className="data-[state=active]:bg-gray-200 rounded-lg p-1" value="account">Datos del menú</TabsTrigger>
                            <TabsTrigger className="data-[state=active]:bg-gray-200 rounded-lg p-1" value="password">Acciones</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account" className="overflow-y-auto">
                            <MenuForm
                                initialData={itemSeleccionado}
                                onSubmit={onConfirm}
                                onCancel={() => { }}
                                isLoading={false}
                            />
                        </TabsContent>
                        <TabsContent value="password">
                            <div>
                                <h1>Password</h1>
                            </div>
                        </TabsContent>
                    </Tabs>

                </div>
                {/* <DialogFooter className="flex justify-end border-t border-gray-200 pt-2">
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button variant="default" onClick={onConfirm}>
                        Guardar
                    </Button>
                </DialogFooter> */}
            </DialogContent>
        </Dialog>
    );
};
