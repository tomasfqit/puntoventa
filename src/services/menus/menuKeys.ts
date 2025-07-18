export const menuKeys = {
  all: ["menus"] as const,
  list: () => [...menuKeys.all, "list"] as const,
  listGrupo: () => [...menuKeys.all, "listGrupo"] as const,
  details: () => [...menuKeys.all, "detail"] as const,
  detail: (id: string) => [...menuKeys.details(), id] as const,
};
