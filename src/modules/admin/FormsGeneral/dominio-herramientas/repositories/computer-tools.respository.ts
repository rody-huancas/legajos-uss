import AxiosConfig from "@config/axios.config";
import { handleAxiosError } from "@shared/utils/axios.util";
import { IComputerToolsPost, IResponseComputerTool, IResponseComputerTools } from "../models/computer-tools.model";

export class ComputerToolsRepository {
   
  // Obtener la lista de dominio de TICs
  async getLstComputerTools(ncodigo: number) {
    try {
      const response = await AxiosConfig<IResponseComputerTools>(`/idiomaofimatica_lst/${ncodigo}`);
      const data = response.data.odata;
      const dataFilter = data.filter((item) => item.cLegIdOfTipo === true);
      return dataFilter;
    } catch (error) {
      handleAxiosError(error, { defaultMessage: 'Ocurrió un error al obtener los dominios de TICs.' });
      throw error;
    }
  }

  // Obtener un dominio de TICs
  async getComputerTool(ncodigo: number) {
    try {
      const response = await AxiosConfig<IResponseComputerTool>(`/idiomaofimatica/${ncodigo}`);
      return response.data.odata;
    } catch (error) {
      handleAxiosError(error, { defaultMessage: 'Ocurrió un error al obtener el dominio de TIC.' });
      throw error;
    }
  }
  
  // Registrar dominio de TICs
  async registerComputerTools(parnId: number, data: IComputerToolsPost) {
    try {
      const formData = new FormData();
  
      (Object.keys(data) as Array<keyof IComputerToolsPost>).forEach(key => {
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
        defaultMessage: 'Ocurrió un error al registrar el dominio TICs.'
      });
    }
  }

  // Actualizar el dominio de TICs
  async updateComputerTools(parnId: number | undefined, data: IComputerToolsPost) {
    try {
      const formData = new FormData();
  
      (Object.keys(data) as Array<keyof IComputerToolsPost>).forEach(key => {
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
        defaultMessage: 'Ocurrió un error al actualizar el dominio TICs.'
      });
    }
  }

  // Eliminar dominio de TICs
  async removeComputerTools(parnId: number) {
    try {
      const patchData = [
        { op: "replace", path: "/cLegIdOfEstado", value: false },
      ];
   
      const response = await AxiosConfig.patch(`/idiomaofimatica/${parnId}`, patchData);
   
      return response;
    } catch (error) {
      handleAxiosError(error, {
        defaultMessage: 'Ocurrió un error al eliminar el dominio TICs.'
      });
    }
  }
}
