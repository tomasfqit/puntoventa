import { marcaApi } from "@/api/marcaApi";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import { Marca } from "@/interfaces/Table";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { marcaKeys } from "./marcaKeys";

export const useMarcaList = (
  queryOptions?: UseQueryOptions<Marca[], ErrorTypeSupabase, Marca[]>
) => {
  return useQuery({
    queryKey: marcaKeys.list(),
    queryFn: marcaApi.fetchMarcasList,
    ...queryOptions,
  });
};
