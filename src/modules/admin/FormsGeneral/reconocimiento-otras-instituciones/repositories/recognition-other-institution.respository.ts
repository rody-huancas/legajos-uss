import AxiosConfig from "@config/axios.config";
import { handleAxiosError } from "@shared/utils/axios.util";
import { IRecognitionOtherInstitutionPost, IResponseRecognitionOtherInstitution, IResponseRecognitionOtherInstitutions } from "../models/recognition-other-institution.model";

export class RecognitionOtherInstitutionsRepository {
   
  // Obtener la lista de reconocimiento de otras instituciones
  async getLstRecognitionOtherInstitutions(ncodigo: number) {
    try {
      const response = await AxiosConfig<IResponseRecognitionOtherInstitutions>(`/reconocimiento_lst/${ncodigo}`);
      return response.data.odata;
    } catch (error) {
      handleAxiosError(error, { defaultMessage: 'Ocurrió un error al obtener los reconocimientos de otras instituciones.' });
      throw error;
    }
  }
   
  // Obtener el reconocimiento de otras instituciones
  async getRecognitionOtherInstitution(ncodigo: number) {
    try {
      const response = await AxiosConfig<IResponseRecognitionOtherInstitution>(`/reconocimiento/${ncodigo}`);
      return response.data.odata;
    } catch (error) {
      handleAxiosError(error, { defaultMessage: 'Ocurrió un error al obtener el reconocimiento de otras instituciones.' });
      throw error;
    }
  }

  // Registrar el reconocimiento de otras instituciones
  async registerRecognitionOtherInstitutions(parnId: number | undefined, data: IRecognitionOtherInstitutionPost) {
    try {
      const formData = new FormData();
  
      (Object.keys(data) as Array<keyof IRecognitionOtherInstitutionPost>).forEach(key => {
        if (key === 'cFile' && data[key]) {
          formData.append('cFile', data[key] as File);
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key].toString());
        }
      });
  
      const response = await AxiosConfig.post(`/reconocimiento/${parnId}`, formData);
  
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al registrar la carga administrativa docente.'
      });
    }
  }

  // Actualizar el reconocimiento de otras instituciones
  async updateRecognitionOtherInstitutions(parnId: number | undefined, data: IRecognitionOtherInstitutionPost) {
    try {
      const formData = new FormData();
  
      (Object.keys(data) as Array<keyof IRecognitionOtherInstitutionPost>).forEach(key => {
        if (key === 'cFile' && data[key]) {
          formData.append('cFile', data[key] as File);
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key].toString());
        }
      });
  
      const response = await AxiosConfig.post(`/reconocimiento/put/${parnId}`, formData);
  
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al actualizar el reconocimiento de otras instituciones.'
      });
    }
  }

  // Eliminar el reconocimiento de otras instituciones
  async removeRecognitionOtherInstitution(parnId: number) {
    try {
      const patchData = [
        { op: "replace", path: "/cLegRecEstado", value: false },
      ];
   
      const response = await AxiosConfig.patch(`/reconocimiento/${parnId}`, patchData);
   
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al eliminar el reconocimiento de otras instituciones.'
      });
    }
  }
}
