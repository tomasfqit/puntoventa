export const productosKeys = {
  all: ["productos"] as const,
  lists: () => [...productosKeys.all, "list"] as const,
  list: () => [...productosKeys.lists()] as const,
};
