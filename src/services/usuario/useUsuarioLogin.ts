import { fetchUserLogin } from "@/api/usuarioApi";
import { ErrorTypeSupabase } from "@/interfaces/Common";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { IUserLoginResponse, IUserParamsLogin } from "./IUsuario";

export const useLogin = (
  mutationOptions?: UseMutationOptions<
    IUserLoginResponse,
    ErrorTypeSupabase,
    IUserParamsLogin,
    unknown
  >
) => {
  return useMutation({
    mutationFn: fetchUserLogin,
    onError: (err) => {
      console.log(err);
    },
    onSettled: () => {
      console.log("Eliminado con exito");
    },
    ...mutationOptions,
  });
};
