export const modeloKeys = {
  all: ["modelos"] as const,
  lists: ["modelos"] as const,
  list: () => [...modeloKeys.lists] as const,
  details: (id: number) => [...modeloKeys.lists, id] as const,
};
