"use client";

import { Button } from "@/components/ui/button";
import { useModal } from "./useModal";

// Ejemplo de cómo usar el modal global
export const ModalExample = () => {
  const { openModal } = useModal();

  const handleOpenModal = () => {
    openModal({
      title: "Ejemplo de Modal",
      subTitle: "Este es un ejemplo de cómo usar el modal global",
      size: "md",
      viewFooter: true,
      children: (
        <div className="p-4">
          <p>
            Este es el contenido del modal. Puedes poner cualquier componente
            aquí.
          </p>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Ejemplo de input"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
      ),
      onSave: () => {
        console.log("Guardando...");
        // Aquí puedes agregar la lógica para guardar
      },
      onCancel: () => {
        console.log("Cancelando...");
        // Aquí puedes agregar la lógica para cancelar
      },
    });
  };

  const handleOpenModalWithoutFooter = () => {
    openModal({
      title: "Modal sin Footer",
      subTitle: "Este modal no tiene botones de acción",
      size: "sm",
      viewFooter: false,
      children: (
        <div className="p-4">
          <p>Este modal no tiene footer y se puede cerrar solo con la X.</p>
        </div>
      ),
    });
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Ejemplos de Modal Global</h2>

      <div className="space-x-4">
        <Button onClick={handleOpenModal} variant="default">
          Abrir Modal con Footer
        </Button>

        <Button onClick={handleOpenModalWithoutFooter} variant="outline">
          Abrir Modal sin Footer
        </Button>
      </div>
    </div>
  );
};
