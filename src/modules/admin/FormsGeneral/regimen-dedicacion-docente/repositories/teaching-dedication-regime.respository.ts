import AxiosConfig from "@config/axios.config";
import { handleAxiosError } from "@shared/utils/axios.util";
import { IResponseTeachingDedicactionRegime, IResponseTeachingDedicactionsRegime, ITeachingDedicactionsRegimePost } from "../models/teaching-dedication-regime.model";

export class TeachingDedicationRegimeRepository {
   
  // Obtener la lista del régimen dedicación del docente
  async getTeachingDedicationsRegime(ncodigo: number) {
    try {
      const response = await AxiosConfig<IResponseTeachingDedicactionsRegime>(`/regimendedicacion_lst/${ncodigo}`);
      return response.data.odata;
    } catch (error) {
      handleAxiosError(error, { defaultMessage: 'Ocurrió un error al obtener los régimenes de dedicación del docente.' });
      throw error;
    }
  }
   
  // Obtener el régimen dedicación del docente
  async getTeachingDedicationRegime(ncodigo: number) {
    try {
      const response = await AxiosConfig<IResponseTeachingDedicactionRegime>(`/regimendedicacion/${ncodigo}`);
      return response.data.odata;
    } catch (error) {
      handleAxiosError(error, { defaultMessage: 'Ocurrió un error al obtener el régimen de dedicación del docente.' });
      throw error;
    }
  }

  // Registrar Régimen Dedicación Docente
  async registerTeachingDedicationRegime(parnId: number | undefined, data: ITeachingDedicactionsRegimePost) {
    try {
      const formData = new FormData();
  
      (Object.keys(data) as Array<keyof ITeachingDedicactionsRegimePost>).forEach(key => {
        if (key === 'cFile' && data[key]) {
          formData.append('cFile', data[key] as File);
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key].toString());
        }
      });
  
      const response = await AxiosConfig.post(`/regimendedicacion/${parnId}`, formData);
  
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al registrar el régimen dedicación del docente.'
      });
    }
  }

  // Actualizar grado y título
  async updateTeachingDedicationRegime(parnId: number | undefined, data: ITeachingDedicactionsRegimePost) {
    try {
      const formData = new FormData();
  
      (Object.keys(data) as Array<keyof ITeachingDedicactionsRegimePost>).forEach(key => {
        if (key === 'cFile' && data[key]) {
          formData.append('cFile', data[key] as File);
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key].toString());
        }
      });
  
      const response = await AxiosConfig.post(`/regimendedicacion/put/${parnId}`, formData);
  
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al actualizar el régimen dedicación del docente.'
      });
    }
  }

  // Eliminar Régimen Dedicación Docente
  async removeTeachingDedicationRegime(parnId: number) {
    try {
      const patchData = [
        { op: "replace", path: "/cLegRegEstado", value: false },
      ];
   
      const response = await AxiosConfig.patch(`/regimendedicacion/${parnId}`, patchData);
   
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al eliminar la categoría del docente.'
      });
    }
  }
}
