import { rolApi } from "@/api/rolApi";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";

export const useRolDelete = (
  mutationOptions?: UseMutationOptions<
    boolean,
    ErrorTypeSupabase,
    number,
    unknown
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: rolApi.deleteRol,
    onError: (err) => {
      console.log(err);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["rol", "list"] });
    },
    ...mutationOptions,
  });
};
