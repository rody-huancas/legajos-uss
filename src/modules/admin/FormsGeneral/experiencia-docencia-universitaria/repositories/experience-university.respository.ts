import AxiosConfig from "@config/axios.config";
import { IConstante } from "@modules/admin/InformacionGeneral/models/information-general.model";
import { handleAxiosError } from "@shared/utils/axios.util";
import { IExperienceUniversityPost, IResponseExperiencesUniversity, IResponseExperienceUniversity } from "../models/experience-university.model";

export class ExperienceUnivesityRepository {
  // Obtener experiencia universitaria
  async getExperienceUniversity(ncodigo: number) {
    try {
      const response = await AxiosConfig<IResponseExperienceUniversity>(`/docenciauniv/${ncodigo}`);
      return response.data.odata;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al obtener la experiencia universitaria.'
      });
      throw error;
    }
  }

  // Obtener lista de experiencia universitaria
  async getExperiencesUniversity(ncodigo: number) {
    try {
      const response = await AxiosConfig<IResponseExperiencesUniversity>(`/docenciauniv_lst/${ncodigo}`);
      return response.data.odata;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al obtener la experiencia universitaria.'
      });
      throw error;
    }
  }

  // Obtener régimen dedicación
  async getDedicationRegime() {
    try {
      const response = await AxiosConfig<{ odata: IConstante[] }>("/constante/2");
      const data = response.data.odata.filter(item => item.nConValor !== 0);
      return data;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al obtener el Régimen Dedicación.'
      });
      throw error;
    }
  }

  // Obtener Cargo
  async getTeachingCategory() {
    try {
      const response = await AxiosConfig<{ odata: IConstante[] }>("/constante/17");
      const data = response.data.odata.filter(item => item.nConValor !== 0);
      return data;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al obtener el Cargo.'
      });
      throw error;
    }
  }

  // Registrar cargo
  async registerExperienceUniversity(parnId: number | undefined, data: IExperienceUniversityPost) {
    try {
      const formData = new FormData();
  
      (Object.keys(data) as Array<keyof IExperienceUniversityPost>).forEach(key => {
        if (key === 'cFile' && data[key]) {
          formData.append('cFile', data[key] as File);
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key].toString());
        }
      });
  
      const response = await AxiosConfig.post(`/docenciauniv/${parnId}`, formData);
  
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al registrar la experiencia universitaria.'
      });
    }
  }

  async updateExperienceUniversity(parnId: number | undefined, data: IExperienceUniversityPost) {
    try {
      const formData = new FormData();
  
      (Object.keys(data) as Array<keyof IExperienceUniversityPost>).forEach(key => {
        if (key === 'cFile' && data[key]) {
          formData.append('cFile', data[key] as File);
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key].toString());
        }
      });
  
      const response = await AxiosConfig.post(`/docenciauniv/put/${parnId}`, formData);
  
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al actualizar la experiencia universitaria.'
      });
    }
  }

  // Eliminar experiencia
  async removeExperienceUniversity(parnId: number) {
    try {
      const patchData = [
        { op: "replace", path: "/cLegDocEstado", value: false },
      ];
  
      const response = await AxiosConfig.patch(`/docenciauniv/${parnId}`, patchData);
  
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al eliminar la experiencia universitaria.'
      });
    }
  }
}
