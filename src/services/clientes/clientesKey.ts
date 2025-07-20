export const clientesKeys = {
  all: ["clientes"] as const,
  lists: () => [...clientesKeys.all, "list"] as const,
  list: () => [...clientesKeys.lists()] as const,
};
