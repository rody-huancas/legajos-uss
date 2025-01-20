import axios from "axios";
import { ILoginCredentials, ILoginResponse } from "../models/login.model";
import { URL_API } from "@config/env.config";
import { showNotification } from "@shared/utils/notification.util";


export class LoginRepository {
  /**
   * Método para realizar el login.
   * 
   * @param {ILoginCredentials} credentials - Credenciales de inicio de sesión.
   * @returns {Promise<ILoginResponse>} Promesa que devuelve la respuesta del login.
   */
  async login({ pcPerUsuCodigo, pcPerUsuClave }: ILoginCredentials): Promise<ILoginResponse> {
    try {
      const url = `${URL_API}/login/${pcPerUsuCodigo}/${pcPerUsuClave}`;
      const response = await axios.post(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification("error", error.response?.data?.message);
      }
      showNotification("error", "Ocurrió un error");
      throw error;
    }
  }
}
