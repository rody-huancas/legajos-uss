import { devtools, persist } from "zustand/middleware";
import { StateCreator, create } from "zustand";
/* Auth */
import { AuthState } from "@modules/authentication/login/models";
import { loginService } from "@modules/authentication/login/services";
import { showNotification } from "@shared/utils/notification.util";

/**
 * Creación del estado de autenticación.
 * 
 * @param set - Función para setear el estado.
 * @returns Un objeto que contiene el estado actual del usuario y métodos para login y logout.
 */
const storeApi: StateCreator<AuthState> = (set) => ({
  status: "pending",
  user: undefined,
  profile: "",

  loginUser: async (pcPerUsuCodigo: string, pcPerUsuClave: string) => {
    try {
      const response = await loginService.login({ pcPerUsuCodigo, pcPerUsuClave });
      set({ status: "authorized", user: response?.odata });
      if (response?.cstate) {
        showNotification("success", response?.cmessage!);
      } else {
        set({ status: "unauthorized", user: undefined });
        showNotification("warning", response?.cmessage!);
      }
    } catch (error) {
      set({ status: "unauthorized", user: undefined });
      showNotification("error", "Ocurrió un error desconocido.");
    }
  },

  logoutUser: () => set({ status: "unauthorized", user: undefined, profile: "" }),
  
  setProfile: (value: string) => set({ profile: value }),
});

/**
 * Creación del hook para el uso del estado de autenticación.
 * 
 * @returns El hook para el uso del estado de autenticación.
 */
export const useAuthStore = create<AuthState>()(
  devtools(persist(storeApi, { name: "auth-legajos-uss" }))
);
