import AxiosConfig from "@config/axios.config";
import { handleAxiosError } from "@shared/utils/axios.util";
import { IResponseSocialProjection, IResponseSocialProjections, ISocialProjectionPost } from "../models/social-projection.model";

export class SocialProjectionRepository {
   
  // Obtener la lista de proyección social
  async getLstSocialProjections(ncodigo: number) {
    try {
      const response = await AxiosConfig<IResponseSocialProjections>(`/proyeccionsocial_lst/${ncodigo}`);
      return response.data.odata;
    } catch (error) {
      handleAxiosError(error, { defaultMessage: 'Ocurrió un error al obtener las proyecciones sociales.' });
      throw error;
    }
  }
   
  // Obtener la proyección social
  async getSocialProjection(ncodigo: number) {
    try {
      const response = await AxiosConfig<IResponseSocialProjection>(`/proyeccionsocial/${ncodigo}`);
      return response.data.odata;
    } catch (error) {
      handleAxiosError(error, { defaultMessage: 'Ocurrió un error al obtener la proyección social.' });
      throw error;
    }
  }

  // Registrar la proyección social
  async registerSocialProjection(parnId: number | undefined, data: ISocialProjectionPost) {
    try {
      const formData = new FormData();
  
      (Object.keys(data) as Array<keyof ISocialProjectionPost>).forEach(key => {
        if (key === 'cFile' && data[key]) {
          formData.append('cFile', data[key] as File);
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key].toString());
        }
      });
  
      const response = await AxiosConfig.post(`/proyeccionsocial/${parnId}`, formData);
  
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al registrar la proyección social.'
      });
    }
  }

  // Actualizar la proyección social
  async updateSocialProjection(parnId: number | undefined, data: ISocialProjectionPost) {
    try {
      const formData = new FormData();
  
      (Object.keys(data) as Array<keyof ISocialProjectionPost>).forEach(key => {
        if (key === 'cFile' && data[key]) {
          formData.append('cFile', data[key] as File);
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key].toString());
        }
      });
  
      const response = await AxiosConfig.post(`/proyeccionsocial/put/${parnId}`, formData);
  
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al actualizar la proyección social.'
      });
    }
  }

  // Eliminar la proyección social
  async removeSocialProjection(parnId: number) {
    try {
      const patchData = [
        { op: "replace", path: "/cLegProyEstado", value: false },
      ];
   
      const response = await AxiosConfig.patch(`/proyeccionsocial/${parnId}`, patchData);
   
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al eliminar la proyección social.'
      });
    }
  }
}
