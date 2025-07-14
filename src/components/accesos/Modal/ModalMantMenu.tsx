"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { ITableMenus } from "@/interfaces/TableActionsProps";

interface ConfirmDeleteDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    title?: string;
    subTitle?: string;
    itemSeleccionado?: ITableMenus;
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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{subTitle}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => onOpenChange(false)}>
                        Cancelar
                    </Button>
                    <Button variant="default" onClick={onConfirm}>
                        Guardar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
