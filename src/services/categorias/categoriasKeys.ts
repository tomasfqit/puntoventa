export const categoriasKeys = {
  all: ["categorias"] as const,
  lists: ["categorias"] as const,
  list: () => [...categoriasKeys.lists] as const,
  details: (id: number) => [...categoriasKeys.lists, id] as const,
};
