import { menuApi } from "@/api/menuApi";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import { Menu } from "@/interfaces/Table";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { menuKeys } from "./menuKeys";

export const useMenuList = (
  queryOptions?: UseQueryOptions<Menu[], ErrorTypeSupabase, Menu[]>
) => {
  return useQuery({
    queryKey: menuKeys.list(),
    queryFn: menuApi.fetchMenus,
    ...queryOptions,
  });
};
