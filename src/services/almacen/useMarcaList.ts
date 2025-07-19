import { almacenApi } from "@/api/almacenApi";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import { Almacen } from "@/interfaces/Table";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { almacenKeys } from "./almacenKeys";

export const useAlmacenList = (
  queryOptions?: UseQueryOptions<Almacen[], ErrorTypeSupabase, Almacen[]>
) => {
  return useQuery({
    queryKey: almacenKeys.list(),
    queryFn: almacenApi.fetchAlmacenesList,
    ...queryOptions,
  });
};
