import { modeloApi } from "@/api/modeloApi";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import { Marca } from "@/interfaces/Table";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { modeloKeys } from "./modeloKeys";

export const useModeloList = (
  queryOptions?: UseQueryOptions<Marca[], ErrorTypeSupabase, Marca[]>
) => {
  return useQuery({
    queryKey: modeloKeys.list(),
    queryFn: modeloApi.fetchModeloList,
    ...queryOptions,
  });
};
