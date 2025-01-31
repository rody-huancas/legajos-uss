import AxiosConfig from "@config/axios.config";
import { handleAxiosError } from "@shared/utils/axios.util";
import { IRegisterDegreesTitle, IResponseDegreesTitle, IResponseDegreeTitle } from "../models/degrees-title.model";

export class DegreesTitlesRepository {
  // Obtener grado y titulo
  async getDegreeTitle(ncodigo: number) {
    try {
      const response = await AxiosConfig<IResponseDegreeTitle>(`/gradotitulo/${ncodigo}`);
      return response.data.odata;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al obtener el grado y título.'
      });
      throw error;
    }
  }

  // Obtener grados y titulos
  async getDegreesTitles(ncodigo: number) {
    try {
      const response = await AxiosConfig<IResponseDegreesTitle>(`/gradotitulo_lst/${ncodigo}`);
      return response.data.odata;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al obtener los grados y títulos.'
      });
      throw error;
    }
  }

  // Registrar grado y título
  async registerDegreeTitle(parnId: number | undefined, data: IRegisterDegreesTitle) {
    try {
      const formData = new FormData();
  
      (Object.keys(data) as Array<keyof IRegisterDegreesTitle>).forEach(key => {
        if (key === 'cFile' && data[key]) {
          formData.append('cFile', data[key] as File);
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key].toString());
        }
      });
  
      const response = await AxiosConfig.post(`/gradotitulo/${parnId}`, formData);
  
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al registrar el grado y título.'
      });
    }
  }

  // Actualizar grado y título
  async updateDegreeTitle(parnId: number | undefined, data: IRegisterDegreesTitle) {
    try {
      const formData = new FormData();
  
      (Object.keys(data) as Array<keyof IRegisterDegreesTitle>).forEach(key => {
        if (key === 'cFile' && data[key]) {
          formData.append('cFile', data[key] as File);
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key].toString());
        }
      });
  
      const response = await AxiosConfig.post(`/gradotitulo/put/${parnId}`, formData);
  
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al actualizar el grado y título.'
      });
    }
  }

  // Eliminar grado y título
  async removeDegreeTitle(parnId: number) {
    try {
      const patchData = [
        { op: "replace", path: "/cLegGraEstado", value: false },
      ];
  
      const response = await AxiosConfig.patch(`/gradotitulo/${parnId}`, patchData);
  
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al eliminar el grado y título.'
      });
    }
  }
}
