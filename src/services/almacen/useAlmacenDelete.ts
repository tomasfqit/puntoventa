import { almacenApi } from "@/api/almacenApi";
import { CustomToastSonner } from "@/helpers/CustomToastSonner";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { almacenKeys } from "./almacenKeys";

export const useAlmacenDelete = (
  mutationOptions?: UseMutationOptions<
    boolean | null,
    ErrorTypeSupabase,
    number,
    unknown
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: almacenApi.deleteAlmacen,
    onError: (err) => {
      CustomToastSonner.error("No se pudo eliminar el almacen", err.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: almacenKeys.list() });
    },
    ...mutationOptions,
  });
};
