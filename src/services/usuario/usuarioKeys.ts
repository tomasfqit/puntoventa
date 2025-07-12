export const usuarioKeys = {
  all: ["usuarios"] as const,
  lists: () => [...usuarioKeys.all, "list"] as const,
  list: () => [...usuarioKeys.lists()] as const,
  details: () => [...usuarioKeys.all, "detail"] as const,
  detail: (id: string) => [...usuarioKeys.details(), id] as const,
  login: () => [...usuarioKeys.all, "login"] as const,
  loginUsernamePassword: (username: string, password: string) =>
    [...usuarioKeys.login(), username, password] as const,
};
