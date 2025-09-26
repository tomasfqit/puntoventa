import { IBrother } from "@/interfaces/IBrother";

export const brotherListService: IBrother[] = [
  { id: "1", name: "Felipe Quichimbo" },
  { id: "2", name: "Priscila Baculima" },
  { id: "3", name: "Santiago Jara" },
  { id: "4", name: "Cristina Carrión" },
  { id: "5", name: "Gabriel Pijuaná" },
  { id: "6", name: "Ana Paula" },
  { id: "7", name: "María Paz" },
  { id: "8", name: "Nelly Pauta" },
  { id: "9", name: "David Parra" },
  { id: "10", name: "Esther Quichimbo" },
  { id: "11", name: "Anthony Maican" },
  { id: "12", name: "Silvia Mejía" },
  { id: "13", name: "Valentina Ávila" },
  { id: "14", name: "David Quichimbo" },
  { id: "15", name: "Caridad Lucero" },
  { id: "16", name: "Gabriela Franco" },
  { id: "17", name: "Diego Aguilar" },
  { id: "18", name: "Carlos Suquilanda" },
  { id: "19", name: "Pame Arévalo" },
  { id: "20", name: "Erika Campoverde" },
  { id: "21", name: "Gabriela Campoverde" },
  { id: "22", name: "Fernando Torres" },
  { id: "23", name: "Juan Francisco Jara" },
  { id: "24", name: "Alejandra Vásquez" },
  { id: "25", name: "Emanuel Vásquez" },
  { id: "26", name: "Santiago Lojano" },
  { id: "27", name: "Ligia" },
  { id: "28", name: "Emily Lojano" },
  { id: "29", name: "Valeria Pintado" },
  { id: "30", name: "Kevin Triviño" },
  { id: "31", name: "Erick Becerra" },
  { id: "32", name: "Pablo Arízaga" },
  { id: "33", name: "Edisson Portilla" },
  { id: "34", name: "Johana Arqui" },
  { id: "35", name: "José Hernandez" },
  { id: "36", name: "Katherine Campoverde" },
  { id: "37", name: "Francisco Pijuaná" },
  { id: "38", name: "Iván Naula" },
  { id: "39", name: "David Naula" },
  { id: "40", name: "Elías Cabrera" },
  { id: "41", name: "Isaac Cabrera" },
  { id: "42", name: "Emilia Espinoza" },
  { id: "43", name: "Matías Espinoza" },
];

export const setLocalStorageBrother = (brother: IBrother) => {
  localStorage.setItem("brother", JSON.stringify(brother));
};

export const getLocalStorageBrother = (): IBrother | null => {
  const brother = localStorage.getItem("brother");
  return brother ? JSON.parse(brother) : null;
};
