import { productosApi } from "@/api/productosApi";
import { SFormProductoData } from "@/components/inventario/Render/schemaFormProducto";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useProductoCreate = (
  mutationOptions?: UseMutationOptions<
    boolean | null,
    ErrorTypeSupabase,
    { producto: SFormProductoData; bodega_id: number; cantidad: number },
    unknown
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productosApi.createProducto,
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
    },
    ...mutationOptions,
  });
};
