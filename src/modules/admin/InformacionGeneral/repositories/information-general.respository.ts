import axios from "axios";
import AxiosConfig from "@config/axios.config";
import { showNotification } from "@shared/utils/notification.util";
import { IInterface, IConstante } from "../models/information-general.model";

export class InformationGeneralRepository {
  
  // Obtener los grados académicos
  async getAcademicDegree() {
    try {
      const response = await AxiosConfig<{ odata: IInterface[] }>("/interface/1");
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
      const response = await AxiosConfig<{ odata: IInterface[] }>("/interface/2");
      return response.data.odata;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification("error", error.response?.data?.message);
      }
      showNotification("error", "Ocurrió un error");
      throw error;
    }
  }

  // Obtener el paises
  async getCountries() {
    try {
      const response = await AxiosConfig<{ odata: IInterface[] }>("/interface/3");
      return response.data.odata;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification("error", error.response?.data?.message);
      }
      showNotification("error", "Ocurrió un error");
      throw error;
    }
  }

  // Obtener el estado civil
  async getMaritalStatus() {
    try {
      const response = await AxiosConfig<{ odata: IConstante[] }>("/constante/22");
      return response.data.odata;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification("error", error.response?.data?.message);
      }
      showNotification("error", "Ocurrió un error");
      throw error;
    }
  }

  // Obtener el sexo
  async getSexo() {
    try {
      const response = await AxiosConfig<{ odata: IConstante[] }>("/constante/20");
      return response.data.odata;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification("error", error.response?.data?.message);
      }
      showNotification("error", "Ocurrió un error");
      throw error;
    }
  }

  // Obtener el sexo
  async getLanguage() {
    try {
      const response = await AxiosConfig<{ odata: IConstante[] }>("/get_idioma");
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
