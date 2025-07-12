import { Session, User, WeakPassword } from "@supabase/supabase-js";

export interface IUserParamsLogin {
  username: string;
  password: string;
}
export interface IUserLoginResponse {
  nombres: string;
  apellidos: string;
  persona_id: number;
  id: number;
}
export interface IUserLoginResponseAuth {
  user: User | null;
  session: Session | null;
  weakPassword?: WeakPassword | null;
}
