import axios from "axios";
import AxiosConfig from "@config/axios.config";
import { showNotification } from "@shared/utils/notification.util";

export class DegreesTitlesRepository {
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
