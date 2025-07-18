import { rolApi } from "@/api/rolApi";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import { IDBTableRol } from "@/interfaces/Table";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

export const useRolCreate = (
  mutationOptions?: UseMutationOptions<
    boolean,
    ErrorTypeSupabase,
    IDBTableRol,
    unknown
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rolApi.createRol,
    onError: (err) => {
      console.log(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["rol", "list"] });
    },
    ...mutationOptions,
  });
};
