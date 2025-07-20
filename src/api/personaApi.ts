import { errorApiSupabase } from "@/helpers";
import { Persona } from "@/interfaces/Table";
import { supabase } from "@/lib/supabaseClient";

export const personaApi = {
  fetchPersonaById: async (id: number) => {
    const { data, error } = await supabase
      .from("persona")
      .select("*")
      .eq("id", id);
    errorApiSupabase(error);
    return data?.[0] || null;
  },
  fetchPersonasList: async () => {
    const { data, error } = await supabase
      .from("persona")
      .select("*")
      .is("deleted_at", null)
      .order("nombre", { ascending: true });
    if (error) errorApiSupabase(error);
    return data as Persona[];
  },

  createPersona: async (persona: Persona): Promise<Persona | null> => {
    const { error, status, data } = await supabase
      .from("persona")
      .insert(persona)
      .select();

    if (error) errorApiSupabase(error);
    return status === 201 ? data?.[0] : null;
  },
  updatePersona: async ({ persona, id }: { persona: Persona; id: number }) => {
    const { error, status } = await supabase
      .from("persona")
      .update(persona)
      .eq("id", id)
      .select();

    if (error) errorApiSupabase(error);
    return status === 200 ? true : false;
  },
  deletePersona: async (id: number) => {
    const { error, status } = await supabase
      .from("persona")
      .delete()
      .eq("id", id);
    if (error) errorApiSupabase(error);
    return status === 200 ? true : false;
  },
};
