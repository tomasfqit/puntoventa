import { errorApiSupabase } from "@/helpers";
import { obtenerMenuItems } from "@/helpers/obtenerMenuItems";
import { Cliente, Persona } from "@/interfaces/Table";
import { supabase } from "@/lib/supabaseClient";
import {
  IPersonaCliente,
  IViewPersonaClienteList,
} from "@/models/IPersonaCliente";
import { personaApi } from "./personaApi";

export const clientesApi = {
  fetchClienteById: async (id: number) => {
    const persona = await personaApi.fetchPersonaById(id);
    if (!persona) return null;
    const { data, error } = await supabase
      .from("cliente")
      .select("*")
      .eq("id", id);
    errorApiSupabase(error);
    const menuItems = obtenerMenuItems(data || []);
    return menuItems;
  },
  fetchClientesList: async (): Promise<IViewPersonaClienteList[]> => {
    const { data, error } = await supabase
      .from("view_persona_cliente")
      .select("*")
      .is("deleted_at", null)
      .order("apellidos", { ascending: true });
    errorApiSupabase(error);
    return data as IViewPersonaClienteList[];
  },
  createCliente: async (
    personaCliente: IPersonaCliente
  ): Promise<Cliente | null> => {
    const newPersona: Persona = {
      nombres: personaCliente.nombres,
      apellidos: personaCliente.apellidos,
      identificacion: personaCliente.identificacion,
      telefono: personaCliente.telefono,
      correo: personaCliente.correo,
      direccion: personaCliente.direccion,
    };
    const newPersonaCreated = await personaApi.createPersona(newPersona);
    if (!newPersonaCreated) return null;
    const newCliente: Cliente = {
      ...personaCliente.cliente,
      persona_id: newPersonaCreated.id || 0,
    };
    const { error, status, data } = await supabase
      .from("cliente")
      .insert([newCliente])
      .select();
    if (error) errorApiSupabase(error);
    return status === 201 ? data?.[0] : null;
  },
  updateCliente: async ({
    clientePersona,
    persona_id,
    cliente_id,
  }: {
    clientePersona: IPersonaCliente;
    persona_id: number;
    cliente_id: number;
  }) => {
    const editPersona: Persona = clientePersona;
    const editCliente: Cliente = clientePersona.cliente;
    const { data: persona, error: errorPersona } = await supabase
      .from("persona")
      .update(editPersona)
      .eq("id", persona_id)
      .select();
    errorApiSupabase(errorPersona);
    if (!persona) return null;
    const { error, status } = await supabase
      .from("cliente")
      .update(editCliente)
      .eq("id", cliente_id)
      .select();

    errorApiSupabase(error);
    return status === 200 ? true : false;
  },
  deleteCliente: async (id: number) => {
    const { error, status } = await supabase
      .from("cliente")
      .delete()
      .eq("id", id);
    if (error) errorApiSupabase(error);
    return status === 200 ? true : false;
  },
};
