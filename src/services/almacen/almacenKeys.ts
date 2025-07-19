export const almacenKeys = {
  all: ["almacenes"] as const,
  lists: ["almacenes"] as const,
  list: () => [...almacenKeys.lists] as const,
  details: (id: number) => [...almacenKeys.lists, id] as const,
};
