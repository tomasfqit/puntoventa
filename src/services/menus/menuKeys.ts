export const menuKeys = {
  all: ["menus"] as const,
  lists: () => [...menuKeys.all, "list"] as const,
  list: () => [...menuKeys.lists(), "list"] as const,
  details: () => [...menuKeys.all, "detail"] as const,
  detail: (id: string) => [...menuKeys.details(), id] as const,
};
