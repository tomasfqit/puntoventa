import { bodegaApi } from "@/api/bodegasApi";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { bodegaKeys } from "./bodegaKey";

export const useBodegaDelete = (
  mutationOptions?: UseMutationOptions<
    boolean | null,
    ErrorTypeSupabase,
    number,
    unknown
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bodegaApi.deleteBodega,
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bodegaKeys.list() });
    },
    ...mutationOptions,
  });
};
