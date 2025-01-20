import axios from "axios";
import { PropsRolUser } from "../models/rol-user.model";
import { ResponseSuccess } from "@shared/models/global.model";
import { showNotification } from "@shared/utils/notification.util";

import { URL_API } from "@config/env.config";
import AxiosConfig from "@config/axios.config";

export class RolUserRepository {
  
  // Obtener el tipo de usuario
  async getUserType({ cPerCodigo }: PropsRolUser) {
    try {
      const url = `/tipousuario/${cPerCodigo}`;
      const response = await AxiosConfig(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification("error", error.response?.data?.message);
      }
      showNotification("error", "Ocurrió un error");
      throw error;
    }
  }

  // Enviar declaración jurada
  async swornDeclaration({ cPerCodigo }: PropsRolUser): Promise<ResponseSuccess> {
    try {
      const url = `${URL_API}/declacionjurada/${cPerCodigo}`;
      const response = await AxiosConfig.post(url);
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
