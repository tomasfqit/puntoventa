import { almacenApi } from "@/api/almacenApi";
import { CustomToastSonner } from "@/helpers/CustomToastSonner";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import { Almacen } from "@/interfaces/Table";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { almacenKeys } from "./almacenKeys";

export const useAlmacenUpdate = (
  mutationOptions?: UseMutationOptions<
    boolean | null,
    ErrorTypeSupabase,
    { almacen: Almacen; id: number },
    unknown
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: almacenApi.updateAlmacen,
    onError: (err) => {
      CustomToastSonner.error("No se pudo actualizar el almacen", err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: almacenKeys.list() });
    },
    ...mutationOptions,
  });
};
