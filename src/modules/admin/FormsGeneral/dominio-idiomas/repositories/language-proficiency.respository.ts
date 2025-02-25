import AxiosConfig from "@config/axios.config";
import { handleAxiosError } from "@shared/utils/axios.util";
import { ILanguageProficiencyPost, IResponseLanguageProficiencies, IResponseLanguageProficiency } from "../models/language-proficiency.model";

export class LanguageProficiencyRepository {
   
  // Obtener la lista de idiomas distintos al materno
  async getLstLanguageProficiencies(ncodigo: number) {
    try {
      const response = await AxiosConfig<IResponseLanguageProficiencies>(`/idiomaofimatica_lst/${ncodigo}`);
      const data = response.data.odata;
      const dataFilter = data.filter((item) => item.cLegIdOfTipo === false); 
      return dataFilter;
    } catch (error) {
      handleAxiosError(error, { defaultMessage: 'Ocurrió un error al obtener los dominios de idiomas.' });
      throw error;
    }
  }

  // Obtener la lista de experiencia profesional no docente
  async getLanguageProficiency(ncodigo: number) {
    try {
      const response = await AxiosConfig<IResponseLanguageProficiency>(`/idiomaofimatica/${ncodigo}`);
      return response.data.odata;
    } catch (error) {
      handleAxiosError(error, { defaultMessage: 'Ocurrió un error al obtener el dominio de idioma.' });
      throw error;
    }
  }
  
  // Registrar idioma distinto al materno
  async registerLanguageProficiency(parnId: number, data: ILanguageProficiencyPost) {
    try {
      const formData = new FormData();
  
      (Object.keys(data) as Array<keyof ILanguageProficiencyPost>).forEach(key => {
        if (key === 'cFile' && data[key]) {
          formData.append('cFile', data[key] as File);
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key].toString());
        }
      });

      const response = await AxiosConfig.post(`/idiomaofimatica/${parnId}`, formData);
  
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al registrar el dominio de idioma.'
      });
    }
  }

  // Actualizar la experiencia profesional no docente
  async updateLanguageProficiency(parnId: number | undefined, data: ILanguageProficiencyPost) {
    try {
      const formData = new FormData();
  
      (Object.keys(data) as Array<keyof ILanguageProficiencyPost>).forEach(key => {
        if (key === 'cFile' && data[key]) {
          formData.append('cFile', data[key] as File);
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key].toString());
        }
      });
  
      const response = await AxiosConfig.post(`/idiomaofimatica/put/${parnId}`, formData);
  
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al actualizar el dominio de idioma.'
      });
    }
  }

  // Eliminar idioma distinto al materno
  async removeLanguageProficiency(parnId: number) {
    try {
      const patchData = [
        { op: "replace", path: "/cLegIdOfEstado", value: false },
      ];
   
      const response = await AxiosConfig.patch(`/idiomaofimatica/${parnId}`, patchData);
   
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al eliminar el dominio de idioma.'
      });
    }
  }
}
