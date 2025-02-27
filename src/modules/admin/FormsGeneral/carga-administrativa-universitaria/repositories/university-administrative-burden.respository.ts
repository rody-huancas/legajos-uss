import AxiosConfig from "@config/axios.config";
import { handleAxiosError } from "@shared/utils/axios.util";
import { IResponseUniversitiesAdministrativeBurden, IResponseUniversityAdministrativeBurden, IUniversityAdministrativeBurdenPost } from "../models/university-administrative-burden.model";

export class UniversityAdministrativeBurdenRepository {
   
  // Obtener la lista de carga administrativa
  async getLstUniversityAdministrativeBurden(ncodigo: number) {
    try {
      const response = await AxiosConfig<IResponseUniversitiesAdministrativeBurden>(`/cargaadmin_lst/${ncodigo}`);
      return response.data.odata;
    } catch (error) {
      handleAxiosError(error, { defaultMessage: 'Ocurrió un error al obtener las cargas administrativas docentes.' });
      throw error;
    }
  }
   
  // Obtener la carga administrativa universitaria
  async getUniversityAdministrativeBurden(ncodigo: number) {
    try {
      const response = await AxiosConfig<IResponseUniversityAdministrativeBurden>(`/cargaadmin/${ncodigo}`);
      return response.data.odata;
    } catch (error) {
      handleAxiosError(error, { defaultMessage: 'Ocurrió un error al obtener la carga administrativa universitaria.' });
      throw error;
    }
  }

  // Registrar la carga administrativa universitaria
  async registerUniversityAdministrativeBurden(parnId: number | undefined, data: IUniversityAdministrativeBurdenPost) {
    try {
      const formData = new FormData();
  
      (Object.keys(data) as Array<keyof IUniversityAdministrativeBurdenPost>).forEach(key => {
        if (key === 'cFile' && data[key]) {
          formData.append('cFile', data[key] as File);
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key].toString());
        }
      });
  
      const response = await AxiosConfig.post(`/cargaadmin/${parnId}`, formData);
  
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al registrar la carga administrativa docente.'
      });
    }
  }

  // Actualizar la carga administrativa universitaria
  async updateUniversityAdministrativeBurden(parnId: number | undefined, data: IUniversityAdministrativeBurdenPost) {
    try {
      const formData = new FormData();
  
      (Object.keys(data) as Array<keyof IUniversityAdministrativeBurdenPost>).forEach(key => {
        if (key === 'cFile' && data[key]) {
          formData.append('cFile', data[key] as File);
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key].toString());
        }
      });
  
      const response = await AxiosConfig.post(`/cargaadmin/put/${parnId}`, formData);
  
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al actualizar la carga administrativa universitaria.'
      });
    }
  }

  // Eliminar la carga administrativa universitaria
  async removeUniversityAdministrativeBurden(parnId: number) {
    try {
      const patchData = [
        { op: "replace", path: "/cLegAdmEstado", value: false },
      ];
   
      const response = await AxiosConfig.patch(`/cargaadmin/${parnId}`, patchData);
   
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al eliminar la carga administrativa universitaria.'
      });
    }
  }
}
