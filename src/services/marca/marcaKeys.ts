export const marcaKeys = {
  all: ["marcas"] as const,
  lists: ["marcas"] as const,
  list: () => [...marcaKeys.lists] as const,
  details: (id: number) => [...marcaKeys.lists, id] as const,
};
