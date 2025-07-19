import { productosApi } from "@/api/productosApi";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import { Producto } from "@/interfaces/Table";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { productosKeys } from "./productosKeys";

export const useProductosList = (
  queryOptions?: UseQueryOptions<Producto[], ErrorTypeSupabase, Producto[]>
) => {
  return useQuery({
    queryKey: productosKeys.list(),
    queryFn: productosApi.fetchProductosList,
    ...queryOptions,
  });
};
