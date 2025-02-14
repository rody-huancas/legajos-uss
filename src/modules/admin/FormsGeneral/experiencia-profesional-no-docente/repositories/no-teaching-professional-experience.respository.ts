import AxiosConfig from "@config/axios.config";
import { handleAxiosError } from "@shared/utils/axios.util";
import { INoTeachigProfessionalExperiencePost, IResponseNoTeachingProfesionalExperience, IResponseNoTeachingProfesionalExperiences } from "../models/no-teaching-profesional-exprience.model";

export class NoTeachingProfessionalExperienceRepository {
   
  // Obtener la lista de experiencia profesional no docente
  async getLstNoTeachingProfessionalExperience(ncodigo: number) {
    try {
      const response = await AxiosConfig<IResponseNoTeachingProfesionalExperiences>(`/experiencianodoc_lst/${ncodigo}`);
      return response.data.odata;
    } catch (error) {
      handleAxiosError(error, { defaultMessage: 'Ocurrió un error al obtener las experiencias profesionales no docentes.' });
      throw error;
    }
  }
   
  // Obtener la experiencia profesional no docente
  async getNoTeachingProfessionalExperience(ncodigo: number) {
    try {
      const response = await AxiosConfig<IResponseNoTeachingProfesionalExperience>(`/experiencianodoc/${ncodigo}`);
      return response.data.odata;
    } catch (error) {
      handleAxiosError(error, { defaultMessage: 'Ocurrió un error al obtener la experiencia profesional no docente.' });
      throw error;
    }
  }

  // Registrar la experiencia profesional no docente
  async registerNoTeachingProfessionalExperience(parnId: number | undefined, data: INoTeachigProfessionalExperiencePost) {
    try {
      const formData = new FormData();
  
      (Object.keys(data) as Array<keyof INoTeachigProfessionalExperiencePost>).forEach(key => {
        if (key === 'cFile' && data[key]) {
          formData.append('cFile', data[key] as File);
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key].toString());
        }
      });
  
      const response = await AxiosConfig.post(`/experiencianodoc/${parnId}`, formData);
  
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al registrar la experiencia profesional no docente.'
      });
    }
  }

  // Actualizar la experiencia profesional no docente
  async updateNoTeachingProfessionalExperience(parnId: number | undefined, data: INoTeachigProfessionalExperiencePost) {
    try {
      const formData = new FormData();
  
      (Object.keys(data) as Array<keyof INoTeachigProfessionalExperiencePost>).forEach(key => {
        if (key === 'cFile' && data[key]) {
          formData.append('cFile', data[key] as File);
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key].toString());
        }
      });
  
      const response = await AxiosConfig.post(`/experiencianodoc/put/${parnId}`, formData);
  
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al actualizar la experiencia profesional no docente.'
      });
    }
  }

  // Eliminar la experiencia profesional no docente
  async removeNoTeachingProfessionalExperience(parnId: number) {
    try {
      const patchData = [
        { op: "replace", path: "/cLegProEstado", value: false },
      ];
   
      const response = await AxiosConfig.patch(`/experiencianodoc/${parnId}`, patchData);
   
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al eliminar la experiencia profesional no docente.'
      });
    }
  }
}
