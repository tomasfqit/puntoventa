"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModal";
import { Button } from "./button";

export const CustomModal = () => {
  const { isOpen, closeModal, modalConfig } = useModal();

  const handleSave = () => {
    if (modalConfig.onSave) {
      modalConfig.onSave();
    }
    closeModal();
  };

  const handleCancel = () => {
    if (modalConfig.onCancel) {
      modalConfig.onCancel();
    }
    closeModal();
  };

  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      <DialogContent
        className={`flex flex-col min-w-[${modalConfig.size === "sm" ? "30" : modalConfig.size === "md" ? "50" : "70"}vw] h-[95vh]`}
      >
        <DialogHeader className="flex flex-col gap-2 border-b border-gray-200 pb-2">
          <DialogTitle className="text-2xl font-bold ">
            {modalConfig.title}
          </DialogTitle>
          <DialogDescription className="text-md text-gray-500">
            {modalConfig.subTitle}
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full h-full">{modalConfig.children}</div>
        {modalConfig.viewFooter && (
          <DialogFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button variant="default" onClick={handleSave}>
              Guardar
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
