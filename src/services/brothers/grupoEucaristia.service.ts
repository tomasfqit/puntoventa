import { typesGroupsPalabra } from "@/constants";
import { IGroup } from "@/interfaces/IGroup";
import { brotherListService } from "@/services/brothers/brother.service";

const byName = (name: string) => ({
  ...brotherListService.find((b) => b.name === name)!,
});

export const groupsEucaristia: IGroup[] = [
  {
    id: "1",
    number: 1,
    name: "GRUPO EUCARISTIA 1",
    type: typesGroupsPalabra[2].id,
    members: [
      { ...byName("Felipe Quichimbo"), isHead: true },
      { ...byName("Priscila Baculima"), isHead: true },
      byName("Santiago Jara"),
      byName("Cristina Carrión"),
      byName("Gabriel Pijuaná"),
      byName("Ana Paula"),
      byName("María Paz"),
      byName("Nelly Pauta"),
      byName("David Parra"),
    ],
  },
  {
    id: "2",
    number: 2,
    name: "GRUPO EUCARISTIA 2",
    type: typesGroupsPalabra[2].id,
    members: [
      { ...byName("Esther Quichimbo"), isHead: true },
      { ...byName("Anthony Maican"), isHead: true },
      byName("Silvia Mejía"),
      byName("Valentina Ávila"),
      byName("David Quichimbo"),
      byName("Caridad Lucero"),
      byName("Gabriela Franco"),
      byName("Diego Aguilar"),
    ],
  },
  {
    id: "3",
    number: 3,
    name: "GRUPO EUCARISTIA 3",
    type: typesGroupsPalabra[2].id,
    members: [
      { ...byName("Carlos Suquilanda"), isHead: true },
      { ...byName("Pame Arévalo"), isHead: true },
      byName("Erika Campoverde"),
      byName("Gabriela Campoverde"),
      byName("Fernando Torres"),
      byName("Juan Francisco Jara"),
      byName("Alejandra Vásquez"),
      byName("Emanuel Vásquez"),
    ],
  },
  {
    id: "4",
    number: 4,
    name: "GRUPO EUCARISTIA 4",
    type: typesGroupsPalabra[2].id,
    members: [
      { ...byName("Santiago Lojano"), isHead: true },
      { ...byName("Ligia"), isHead: true },
      byName("Emily Lojano"),
      byName("Valeria Pintado"),
      byName("Kevin Triviño"),
      byName("Erick Becerra"),
      byName("Pablo Arízaga"),
      byName("Edisson Portilla"),
      byName("Johana Arqui"),
    ],
  },
  {
    id: "5",
    number: 5,
    name: "GRUPO EUCARISTIA 5",
    type: typesGroupsPalabra[2].id,
    members: [
      { ...byName("José Hernandez"), isHead: true },
      { ...byName("Katherine Campoverde"), isHead: true },
      byName("Francisco Pijuaná"),
      byName("Iván Naula"),
      byName("David Naula"),
      byName("Elías Cabrera"),
      byName("Isaac Cabrera"),
      byName("Emilia Espinoza"),
      byName("Matías Espinoza"),
    ],
  },
];
