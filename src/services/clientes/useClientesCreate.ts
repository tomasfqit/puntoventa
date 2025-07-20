import { clientesApi } from "@/api/clientesApi";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import { Cliente } from "@/interfaces/Table";
import { IPersonaCliente } from "@/models/IPersonaCliente";
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { clientesKeys } from "./clientesKey";

export const useClienteCreate = (
  mutationOptions?: UseMutationOptions<
    Cliente | null,
    ErrorTypeSupabase,
    IPersonaCliente,
    unknown
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clientesApi.createCliente,
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientesKeys.list() });
    },
    ...mutationOptions,
  });
};
