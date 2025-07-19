import { productosApi } from "@/api/productosApi";
import { SFormProductoData } from "@/components/inventario/Render/schemaFormProducto";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

export const useProductoCreate = (
  mutationOptions?: UseMutationOptions<
    boolean | null,
    ErrorTypeSupabase,
    SFormProductoData,
    unknown
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productosApi.createProducto,
    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
    },
    ...mutationOptions,
  });
};
