"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Menu } from "@/interfaces/Table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
interface ConfirmDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title?: string;
  subTitle?: string;
  itemSeleccionado?: Menu;
}

export const ModalMantProductos = ({
  open,
  onOpenChange,
  onConfirm,
  title = "Nuevo Producto",
  subTitle = "Ingrese los datos del nuevo producto",
  itemSeleccionado,
}: ConfirmDeleteDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col min-w-[70vw] h-auto">
        <DialogHeader className="flex flex-col gap-2 border-b border-gray-200 pb-2">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subTitle}</DialogDescription>
        </DialogHeader>
        <div className="flex w-full h-full">
          <Tabs defaultValue="account" className="w-full h-full">
            <TabsList className="flex flex-row gap-2 border border-gray-200 rounded-lg p-1">
              <TabsTrigger
                className="data-[state=active]:bg-gray-200 rounded-lg p-1"
                value="account"
              >
                Datos del producto
              </TabsTrigger>
              <TabsTrigger
                className="data-[state=active]:bg-gray-200 rounded-lg p-1"
                value="password"
              >
                Acciones
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="account"
              className="overflow-y-auto h-[30vh]"
            ></TabsContent>
            <TabsContent value="password" className="overflow-y-auto h-[30vh]">
              <div>
                <h1>Password</h1>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};
