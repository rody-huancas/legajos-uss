import AxiosConfig from "@config/axios.config";
import { ITeachingCategoriesResp, ITeachingCategoryPost } from "../models/teaching-category.model";
import { handleAxiosError } from "@shared/utils/axios.util";

export class TeachingCategoryRepository {
  
  // Obtener lista de categorías del docente
  async getTeachingCategories(ncodigo: number) {
    try {
      const response = await AxiosConfig<ITeachingCategoriesResp>(`/categoriadocente_lst/${ncodigo}`);
      return response.data.odata;
    } catch (error) {
      handleAxiosError(error, { defaultMessage: 'Ocurrió un error al obtener la categoría del docente.' });
      throw error;
    }
  }

  // Registrar categoría del docente
  async registerTeachingCategory(parnId: number | undefined, data: ITeachingCategoryPost) {
    try {
      const formData = new FormData();
  
      (Object.keys(data) as Array<keyof ITeachingCategoryPost>).forEach(key => {
        if (key === 'cFile' && data[key]) {
          formData.append('cFile', data[key] as File);
        } else if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key].toString());
        }
      });
  
      const response = await AxiosConfig.post(`/categoriadocente/${parnId}`, formData);
  
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al registrar la categoría del docente.'
      });
    }
  }
  
  // Eliminar experiencia
  async removeTeachingCategory(parnId: number) {
    try {
      const patchData = [
        { op: "replace", path: "/cLegCatEstado", value: false },
      ];
  
      const response = await AxiosConfig.patch(`/categoriadocente/${parnId}`, patchData);
  
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al eliminar la categoría del docente.'
      });
    }
  }
}
