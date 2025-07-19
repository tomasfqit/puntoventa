export const bodegaKeys = {
  all: ["bodega"] as const,
  lists: () => [...bodegaKeys.all, "list"] as const,
  list: () => [...bodegaKeys.lists()] as const,
};
