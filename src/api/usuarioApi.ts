import { errorApiSupabase } from "@/helpers";
import { Usuario } from "@/interfaces/Table";
import { supabase } from "@/lib/supabaseClient";
import {
  IUserLoginResponse,
  IUserParamsLogin,
} from "@/services/usuario/IUsuario";

export const fetchUserLogin = async (userParams: IUserParamsLogin) => {
  const { username, password } = userParams;
  const { data, error } = await supabase
    .from("usuario")
    .select(
      `
    *,
    persona (
      *
    )
  `
    )
    .eq("username", username)
    .eq("password", password)
    .single();
  if (error) errorApiSupabase(error);
  return data as unknown as IUserLoginResponse;
};

export const fetchUsuarios = async () => {
  const { data, error } = await supabase.from("usuario").select("*");

  if (error) errorApiSupabase(error);
  return data || [];
};

export const fetchUsuarioById = async (id: number) => {
  const { data, error } = await supabase
    .from("usuario")
    .select("*")
    .eq("id", id)
    .single(); // para traer un solo resultado

  if (error) throw new Error(`Error al obtener usuario: ${error.message}`);
  return data;
};

export const createUsuario = async (nuevoUsuario: Usuario) => {
  const { data, error } = await supabase
    .from("usuario")
    .insert(nuevoUsuario)
    .select()
    .single();

  if (error) throw new Error(`Error al crear usuario: ${error.message}`);
  return data;
};

export const updateUsuario = async (id: number, campos: Partial<Usuario>) => {
  const { data, error } = await supabase
    .from("usuario")
    .update(campos)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(`Error al actualizar usuario: ${error.message}`);
  return data;
};

export const deleteUsuario = async (id: number) => {
  const { error } = await supabase.from("usuario").delete().eq("id", id);

  if (error) throw new Error(`Error al eliminar usuario: ${error.message}`);
  return true;
};
