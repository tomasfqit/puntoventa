export const rolKeys = {
  all: ["rol"] as const,
  lists: () => [...rolKeys.all, "list"] as const,
  list: () => [...rolKeys.lists()] as const,
};
