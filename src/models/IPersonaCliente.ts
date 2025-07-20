import { Cliente, Persona } from "@/interfaces/Table";

export interface IPersonaCliente extends Persona {
  cliente: Cliente;
}

export interface IViewPersonaClienteList {
  id: number; // id del cliente
  persona_id: number;
  nombres: string;
  apellidos: string;
  identificacion: string;
  telefono: string;
  correo: string;
  direccion: string;
  tipo_cliente: string;
  created_at: string; // o Date si manejas objetos de fecha
  updated_at: string;
  deleted_at: string | null;
  actions: unknown;
}
