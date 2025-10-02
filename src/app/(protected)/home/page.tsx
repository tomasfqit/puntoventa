"use client";
import CustomCard from "@/components/components/CustomCard";
import { MiGrupoEucaristia } from "@/components/MIGrupoEucaristia";
import { MiGrupoPalabra } from "@/components/MIGrupoPalabra";
import { MiGrupoPanYVino } from "@/components/MIGrupoPanYVino";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/useModal";
import { BookOpenText, Church, Wine } from "lucide-react";
import { BrothersList } from "../brothers/list";
import { CurrentPanYVino } from "./component/CurrentPanYVino";
import { CurrentPresentacionPalabra } from "./component/CurrentPresentacionPalabra";

export default function HomePage() {
  const { openModal } = useModal();

  const openModalPalabra = () => {
    openModal({
      title: "Prensentacion PALABRA",
      subTitle: "Proximo miercoles",
      size: "md",
      viewFooter: true,
      children: <CurrentPresentacionPalabra />,
      onSave: () => {
        // Lógica para guardar
        console.log("Usuario guardado");
      },
      onCancel: () => {
        // Lógica para cancelar
        console.log("Operación cancelada");
      },
    });
  };

  const openModalPanYVino = () => {
    openModal({
      title: "Nuevo Usuario",
      subTitle: "Proximo sabado",
      size: "md",
      viewFooter: true,
      children: <CurrentPanYVino />,
    });
  };
  const openModalBrothersList = () => {
    openModal({
      title: "Listado de hermanos",
      size: "md",
      viewFooter: true,
      children: <BrothersList />,
    });
  };

  return (
    <div className="flex flex-col gap-2 h-[86vh] overflow-y-hidden">
      <h1>Inicio</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 ">
        <Button
          className="flex flex-row hover:cursor-pointer hover:bg-gray-700"
          onClick={openModalPalabra}
        >
          <small>Proximo grupo presentacion PALABRA</small>
          <BookOpenText />
        </Button>
        <Button
          className="flex flex-row hover:cursor-pointer hover:bg-gray-700"
          onClick={openModalPanYVino}
        >
          <small>Proximo grupo PAN Y VINO</small>
          <Wine />
        </Button>
        <Button
          variant="outline"
          className="flex flex-row"
          onClick={openModalBrothersList}
        >
          <small>Listado hermanos</small>
          <Church />
        </Button>
      </div>
      <div className="flex flex-col gap-2 bg-gray-200 rounded-xl h-[50vh] overflow-y-auto">
        <CustomCard title="PALABRA" content={<MiGrupoPalabra />} />
        <CustomCard title="PAN Y VINO" content={<MiGrupoPanYVino />} />
        <CustomCard title="EUCARISTIA" content={<MiGrupoEucaristia />} />
      </div>
    </div>
  );
}
