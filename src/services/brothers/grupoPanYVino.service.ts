import { typesGroupsPalabra } from "@/constants";
import { IGroup } from "@/interfaces/IGroup";
import { brotherListService } from "@/services/brothers/brother.service";

const byName = (name: string) => ({
  ...brotherListService.find((b) => b.name === name)!,
});

export const groupsPanYVino: IGroup[] = [
  {
    id: "5",
    number: 5,
    name: "GRUPO PAN Y VINO 1",
    type: typesGroupsPalabra[1].id,
    members: [
      { ...byName("Felipe Quichimbo"), isHead: true },
      { ...byName("Priscila Baculima"), isHead: true },
      byName("Erick Becerra"),
      byName("Gabriela Franco"),
      byName("Diego Aguilar"),
      byName("Silvia Mejía"),
      byName("Valentina Ávila"),
      byName("Iván Naula"),
      byName("David Naula"),
    ],
  },
  {
    id: "4",
    number: 4,
    name: "GRUPO PAN Y VINO 2",
    type: typesGroupsPalabra[1].id,
    members: [
      { ...byName("Esther Quichimbo"), isHead: true },
      { ...byName("Anthony Maican"), isHead: true },
      byName("Ana Paula"),
      byName("María Paz"),
      byName("David Quichimbo"),
      byName("Juan Francisco Jara"),
      byName("Cristina Carrión"),
      byName("Gabriel Pijuaná"),
      byName("Santiago Jara"),
    ],
  },
  {
    id: "3",
    number: 3,
    name: "GRUPO PAN Y VINO 3",
    type: typesGroupsPalabra[1].id,
    members: [
      { ...byName("Carlos Suquilanda"), isHead: true },
      { ...byName("Pame Arévalo"), isHead: true },
      byName("Valeria Pintado"),
      byName("Kevin Triviño"),
      byName("Pablo Arízaga"),
      byName("Caridad Lucero"),
      byName("Edisson Portilla"),
      byName("Johana Arqui"),
    ],
  },
  {
    id: "2",
    number: 2,
    name: "GRUPO PAN Y VINO 4",
    type: typesGroupsPalabra[1].id,
    members: [
      { ...byName("Santiago Lojano"), isHead: true },
      { ...byName("Ligia"), isHead: true },
      byName("Emily Lojano"),
      byName("Alejandra Vásquez"),
      byName("Emanuel Vásquez"),
      byName("Francisco Pijuaná"),
      byName("Elías Cabrera"),
      byName("Isaac Cabrera"),
    ],
  },
  {
    id: "1",
    number: 1,
    name: "GRUPO PAN Y VINO 5",
    type: typesGroupsPalabra[1].id,
    members: [
      { ...byName("José Hernandez"), isHead: true },
      { ...byName("Katherine Campoverde"), isHead: true },
      byName("Fernando Torres"),
      byName("Nelly Pauta"),
      byName("David Parra"),
      byName("Erika Campoverde"),
      byName("Gabriela Campoverde"),
      byName("Emilia Espinoza"),
      byName("Matías Espinoza"),
    ],
  },
];
