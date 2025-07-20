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

export const useAlmacenCreate = (
  mutationOptions?: UseMutationOptions<
    boolean | null,
    ErrorTypeSupabase,
    Almacen,
    unknown
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: almacenApi.createAlmacen,
    onError: (err) => {
      CustomToastSonner.error("No se pudo crear el almacen", err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: almacenKeys.list() });
    },
    ...mutationOptions,
  });
};
