import { productosApi } from "@/api/productosApi";
import { SFormProductoData } from "@/components/inventario/Render/schemaFormProducto";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useProductoUpdate = (
  mutationOptions?: UseMutationOptions<
    boolean | null,
    ErrorTypeSupabase,
    { producto: SFormProductoData; id: number },
    unknown
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productosApi.updateProducto,
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
    },
    ...mutationOptions,
  });
};
