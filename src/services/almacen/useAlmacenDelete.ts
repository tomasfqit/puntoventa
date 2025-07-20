import { almacenApi } from "@/api/almacenApi";
import { PostgrestError } from "@supabase/supabase-js";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { almacenKeys } from "./almacenKeys";

export const useAlmacenDelete = (
  mutationOptions?: UseMutationOptions<
    boolean | null,
    PostgrestError,
    number,
    unknown
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: almacenApi.deleteAlmacen,
    onError: (err) => {
      toast.error(err.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: almacenKeys.list() });
    },
    ...mutationOptions,
  });
};
