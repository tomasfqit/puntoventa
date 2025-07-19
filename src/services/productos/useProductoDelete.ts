import { productosApi } from "@/api/productosApi";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useProductoDelete = (
  mutationOptions?: UseMutationOptions<
    boolean | null,
    ErrorTypeSupabase,
    number,
    unknown
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: productosApi.deleteProducto,
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productos"] });
    },
    ...mutationOptions,
  });
};
