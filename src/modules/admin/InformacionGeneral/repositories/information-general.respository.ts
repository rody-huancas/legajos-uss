import axios from "axios";
import AxiosConfig from "@config/axios.config";
import { showNotification } from "@shared/utils/notification.util";
import { ICountries } from "../models/information-general.model";

export class InformationGeneralRepository {
  
  // Obtener el paises
  async getCountries() {
    try {
      const response = await AxiosConfig<{ odata: ICountries[] }>("/interface/3");
      return response.data.odata;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification("error", error.response?.data?.message);
      }
      showNotification("error", "Ocurrió un error");
      throw error;
    }
  }

  // Obtener los documentos de identidad
  async getIdentityDocument() {
    try {
      const response = await AxiosConfig<{ odata: ICountries[] }>("/interface/2");
      return response.data.odata;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification("error", error.response?.data?.message);
      }
      showNotification("error", "Ocurrió un error");
      throw error;
    }
  }
}
