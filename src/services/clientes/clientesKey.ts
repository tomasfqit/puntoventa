export const clientesKeys = {
  all: ["clientes"] as const,
  lists: () => [...clientesKeys.all, "list"] as const,
  list: () => [...clientesKeys.lists()] as const,
  cliente: () => [...clientesKeys.all, "byId"] as const,
  clienteFilterById: (params: string) =>
    [...clientesKeys.cliente(), params] as const,
};
