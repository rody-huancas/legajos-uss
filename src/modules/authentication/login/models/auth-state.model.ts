import { Odata } from "./login.model";

export type AuthStatus = "authorized" | "unauthorized" | "pending";

export interface AuthState {
  status     : AuthStatus;
  user?      : Odata;
  profile?   : string;
  
  setProfile : (value: string) => void;
  loginUser  : (pcPerUsuCodigo: string, pcPerUsuClave: string) => void;
  logoutUser : () => void;
}
