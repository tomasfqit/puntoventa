import { typesGroupsPalabra } from "@/constants";
import { IGroup } from "@/interfaces/IGroup";
import { brotherListService } from "@/services/brothers/brother.service";

const byName = (name: string) => ({
  ...brotherListService.find((b) => b.name === name)!,
});

export const groupsPalabra: IGroup[] = [
  {
    id: "1",
    number: 1,
    name: "GRUPO PALABRA 1",
    type: typesGroupsPalabra[0].id,
    members: [
      { ...byName("Iván Naula"), isHead: true },
      { ...byName("David Naula"), isHead: true },
      byName("Elías Cabrera"),
      byName("Isaac Cabrera"),
      byName("Pablo Arízaga"),
      byName("Santiago Jara"),
      byName("Cristina Carrión"),
      byName("Fernando Torres"),
    ],
  },
  {
    id: "2",
    number: 2,
    name: "GRUPO PALABRA 2",
    type: typesGroupsPalabra[0].id,
    members: [
      { ...byName("Carlos Suquilanda"), isHead: true },
      { ...byName("Pame Arévalo"), isHead: true },
      byName("José Hernandez"),
      byName("Katherine Campoverde"),
      byName("Emilia Espinoza"),
      byName("Matías Espinoza"),
      byName("Emily Lojano"),
      byName("Ana Paula"),
      byName("María Paz"),
    ],
  },
  {
    id: "3",
    number: 3,
    name: "GRUPO PALABRA 3",
    type: typesGroupsPalabra[0].id,
    members: [
      { ...byName("Anthony Maican"), isHead: true },
      { ...byName("Esther Quichimbo"), isHead: true },
      byName("Emanuel Vásquez"),
      byName("Alejandra Vásquez"),
      byName("Gabriela Franco"),
      byName("Francisco Pijuaná"),
      byName("David Parra"),
      byName("Gabriel Pijuaná"),
      byName("Juan Francisco Jara"),
    ],
  },
  {
    id: "4",
    number: 4,
    name: "GRUPO PALABRA 4",
    type: typesGroupsPalabra[0].id,
    members: [
      { ...byName("Felipe Quichimbo"), isHead: true },
      { ...byName("Priscila Baculima"), isHead: true },
      byName("Silvia Mejía"),
      byName("Valentina Ávila"),
      byName("Erika Campoverde"),
      byName("Gabriela Campoverde"),
      byName("David Quichimbo"),
      byName("Erick Becerra"),
      byName("Nelly Pauta"),
    ],
  },
  {
    id: "5",
    number: 5,
    name: "GRUPO PALABRA 5",
    type: typesGroupsPalabra[0].id,
    members: [
      { ...byName("Santiago Lojano"), isHead: true },
      { ...byName("Ligia"), isHead: true },
      byName("Valeria Pintado"),
      byName("Kevin Triviño"),
      byName("Diego Aguilar"),
      byName("Caridad Lucero"),
      byName("Edisson Portilla"),
      byName("Juan Francisco Jara"),
      byName("Johana Arqui"),
    ],
  },
];
