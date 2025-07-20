import { almacenApi } from "@/api/almacenApi";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import { Almacen } from "@/interfaces/Table";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
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
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: almacenKeys.list() });
    },
    ...mutationOptions,
  });
};
