import axios from "axios";
import AxiosConfig from "@config/axios.config";
import { showNotification } from "@shared/utils/notification.util";
import { ILegDatosGenerales } from "../models/general-information.model";
import { IInterface, IConstante, IPersona } from "../models/information-general.model";
import { IGradoTitulo } from "../../forms/grados-titulos/repositories/grado-titulo.model";

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
      showNotification("error", "Ocurrió un error");
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
  
  // Obtener el tipo de zona
  async getZoneType() {
    try {
      const response = await AxiosConfig<{ odata: IConstante[] }>("/constante/23");
      return response.data.odata;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification("error", error.response?.data?.message);
      }
      showNotification("error", "Ocurrió un error");
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
      showNotification("error", "Ocurrió un error");
      throw error;
    }
  }

  // Obtener grado y titulo
  async getDegreeTitle(ncodigo: number) {
    try {
      const response = await AxiosConfig(`/gradotitulo_lst/${ncodigo}`);
      return response.data.odata;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification("error", error.response?.data?.message);
      }
      showNotification("error", "Ocurrió un error");
      throw error;
    }
  }


  /********************************************************************************/

  // Registrar grado y título
  async registerDegreeTitle(parnId: number | undefined, data: any) {
    try {
      const formData = new FormData();
      
      Object.keys(data).forEach(key => {
        if (key === 'cFile' && data[key]) {
          formData.append('cFile', data[key]);
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key].toString());
        }
      });
      console.log(formData)
      const response = await AxiosConfig.post(`/gradotitulo/${parnId}`, formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      showNotification("success", "Grado y título registrado correctamente");
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showNotification("error", error.response?.data?.message);
      }
      showNotification("error", "Ocurrió un error al registrar el grado y título");
      throw error;
    }
  }
}
