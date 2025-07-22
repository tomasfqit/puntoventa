import { clientesApi } from "@/api/clientesApi";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import { IViewPersonaClienteList } from "@/models/IPersonaCliente";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { clientesKeys } from "./clientesKey";

export const useClientesById = (
  identificacion: string,
  queryOptions?: UseQueryOptions<
    IViewPersonaClienteList[],
    ErrorTypeSupabase,
    IViewPersonaClienteList[],
    ReturnType<(typeof clientesKeys)["clienteFilterById"]>
  >
) => {
  const obtenerClienteById = async () => {
    return await clientesApi.fetchClienteById(identificacion);
  };
  return useQuery({
    queryKey: ["clientes", "byId", identificacion],
    queryFn: obtenerClienteById,
    ...queryOptions,
  });
};
