import { rolApi } from "@/api/rolApi";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import { IDBTableRol } from "@/interfaces/Table";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { rolKeys } from "./rolKeys";

export const useRolList = (
  queryOptions?: UseQueryOptions<
    IDBTableRol[],
    ErrorTypeSupabase,
    IDBTableRol[]
  >
) => {
  return useQuery({
    queryKey: rolKeys.list(),
    queryFn: rolApi.fetchRolList,
    ...queryOptions,
  });
};
