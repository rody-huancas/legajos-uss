import axios from "axios";
import AxiosConfig from "@config/axios.config";
import { showNotification } from "@shared/utils/notification.util";
import { ILegDatosGenerales } from "../models/general-information.model";
import { IInterface, IConstante, IPersona } from "../models/information-general.model";

export class InformationGeneralRepository {
  
    // Obtener los grados académicos
  async getGeneralInformation(cPerCodigo: string) {
    try {
      const response = await AxiosConfig<{ odata: ILegDatosGenerales }>(`/legajoaux/${cPerCodigo}`);
      return response.data.odata;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification("error", error.response?.data?.message);
      }
      throw error;
    }
  }
  
  // Obtener los grados académicos
  async getAcademicDegree() {
    try {
      const response = await AxiosConfig<{ odata: IInterface[] }>("/interface/1");
      return response.data.odata;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification("error", error.response?.data?.message);
      }
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
      throw error;
    }
  }
  
  // Obtener el tipo de zona
  async getZoneType() {
    try {
      const response = await AxiosConfig<{ odata: IConstante[] }>("/constante/23");
      return response.data.odata;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification("error", error.response?.data?.message);
      }
      throw error;
    }
  }
  
  // Obtener el tipo de zona
  async getStreetType() {
    try {
      const response = await AxiosConfig<{ odata: IConstante[] }>("/constante/19");
      return response.data.odata;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification("error", error.response?.data?.message);
      }
      throw error;
    }
  }

  // Obtener el idioma
  async getLanguage() {
    try {
      const response = await AxiosConfig<{ odata: IConstante[] }>("/get_idioma");
      return response.data.odata;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification("error", error.response?.data?.message);
      }
      throw error;
    }
  }

  // Obtener la institución
  async getInstitution() {
    try {
      const response = await AxiosConfig<{ odata: IPersona[] }>("/persona/1");
      const data = response.data.odata;
      return data.filter(item => item.cPerApellido !== "Otra");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification("error", error.response?.data?.message);
      }
      throw error;
    }
  }

  // Obtener el nivel
  async getLanguageProficiency() {
    try {
      const response = await AxiosConfig<{ odata: IConstante[] }>("/constante/5");
      const data = response.data.odata;
      return data.filter(x=>x.nConValor !== 0);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification("error", error.response?.data?.message);
      }
      throw error;
    }
  }

  // Obtener el nivel
  async getOfficeSkills() {
    try {
      const response = await AxiosConfig<{ odata: IConstante[] }>("/constante/24");
      const data = response.data.odata;
      return data.filter(x=>x.nConValor !== 0);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification("error", error.response?.data?.message);
      }
      throw error;
    }
  }

  // Obtener el nivel
  async getInformatic() {
    try {
      const response = await AxiosConfig<{ odata: IConstante[] }>("/constante/4");
      const data = response.data.odata;
      return data.filter(x=>x.nConValor !== 0);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification("error", error.response?.data?.message);
      }
      throw error;
    }
  }

  // Obtener cargos académicos
  async getAcademicPositions() {
    try {
      const response = await AxiosConfig<{ odata: IConstante[] }>("/constante/16");
      const data = response.data.odata;
      return data.filter(x=>x.nConValor !== 0);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification("error", error.response?.data?.message);
      }
      throw error;
    }
  }

  // Obtener reconocimientos
  async getRecognitions() {
    try {
      const response = await AxiosConfig<{ odata: IConstante[] }>("/constante/10");
      const data = response.data.odata;
      return data.filter(x=>x.nConValor !== 0);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification("error", error.response?.data?.message);
      }
      throw error;
    }
  }

  // Obtener documento de reconocimientos
  async getRecognitionDocuments() {
    try {
      const response = await AxiosConfig<{ odata: IConstante[] }>("/constante/11");
      const data = response.data.odata;
      return data.filter(x=>x.nConValor !== 0);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification("error", error.response?.data?.message);
      }
      throw error;
    }
  }
}
