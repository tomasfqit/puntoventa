import { categoriasApi } from "@/api/categoriasApi";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import { Marca } from "@/interfaces/Table";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { categoriasKeys } from "./categoriasKeys";

export const useCategoriasList = (
  queryOptions?: UseQueryOptions<Marca[], ErrorTypeSupabase, Marca[]>
) => {
  return useQuery({
    queryKey: categoriasKeys.list(),
    queryFn: categoriasApi.fetchCategoriaList,
    ...queryOptions,
  });
};
