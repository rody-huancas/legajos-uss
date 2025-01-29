import { showNotification } from "@shared/utils/notification.util";
import { DegreesTitlesRepository } from "../repositories/degrees-titles.respository";

export class DegreesTitlesService {
  constructor(private degreesTitlesRepository: DegreesTitlesRepository) {}
  
  async getDegreeTitle(ncodigo: number) {
    try {
      const response = await this.degreesTitlesRepository.getDegreeTitle(ncodigo);
      return response;
    } catch (error) {
      showNotification("error", "Ocurrió un error al obtener la información de grados y títulos.");
    }  
  }

  async registerDegreeTitle(id: number | undefined, data: any) {
    try {
      console.log(data)
      const response = await this.degreesTitlesRepository.registerDegreeTitle(id, data);
      return response;
    } catch (error) {
      showNotification("error", "Ocurrió un error al registrar el grado y  título.");
    }  
  }
}
