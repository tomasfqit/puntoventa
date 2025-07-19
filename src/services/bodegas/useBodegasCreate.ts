import { bodegaApi } from "@/api/bodegasApi";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import { Bodega } from "@/interfaces/Table";
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { bodegaKeys } from "./bodegaKey";

export const useBodegaCreate = (
  mutationOptions?: UseMutationOptions<
    boolean | null,
    ErrorTypeSupabase,
    Bodega,
    unknown
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: bodegaApi.createBodega,
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: bodegaKeys.list() });
    },
    ...mutationOptions,
  });
};
