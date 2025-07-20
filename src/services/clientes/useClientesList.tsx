import { clientesApi } from "@/api/clientesApi";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import { Cliente } from "@/interfaces/Table";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { clientesKeys } from "./clientesKey";

export const useClientesList = (
  queryOptions?: UseQueryOptions<Cliente[], ErrorTypeSupabase, Cliente[]>
) => {
  return useQuery({
    queryKey: clientesKeys.list(),
    queryFn: clientesApi.fetchClientesList,
    ...queryOptions,
  });
};
