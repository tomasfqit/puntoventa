import { clientesApi } from "@/api/clientesApi";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import { IPersonaCliente } from "@/models/IPersonaCliente";
import {
  UseMutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";
import { clientesKeys } from "./clientesKey";

export const useClienteUpdate = (
  mutationOptions?: UseMutationOptions<
    boolean | null,
    ErrorTypeSupabase,
    {
      clientePersona: IPersonaCliente;
      persona_id: number;
      cliente_id: number;
    },
    unknown
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: clientesApi.updateCliente,
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientesKeys.list() });
    },
    ...mutationOptions,
  });
};
