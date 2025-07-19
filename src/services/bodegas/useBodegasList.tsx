import { bodegaApi } from "@/api/bodegasApi";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import { Bodega } from "@/interfaces/Table";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { bodegaKeys } from "./bodegaKey";

export const useBodegasList = (
  queryOptions?: UseQueryOptions<Bodega[], ErrorTypeSupabase, Bodega[]>
) => {
  return useQuery({
    queryKey: bodegaKeys.list(),
    queryFn: bodegaApi.fetchBodegasList,
    ...queryOptions,
  });
};
