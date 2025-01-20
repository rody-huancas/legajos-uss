import { showNotification } from "@shared/utils/notification.util";
import { InformationGeneralRepository } from "../repositories/information-general.respository";

export class InformationGeneralService {
  constructor(private InformationGeneralRepository: InformationGeneralRepository) {}

  async getCountries() {
    try {
      const response = await this.InformationGeneralRepository.getCountries();
      return response;
    } catch (error) {
      showNotification("error", "Ocurrió un error al mostrar las nacionalidades.");
    }
  }
  
  async getDocumentIdentity() {
    try {
      const response = await this.InformationGeneralRepository.getIdentityDocument();
      return response;
    } catch (error) {
      showNotification("error", "Ocurrió un error al mostrar los documentos de identidad.");
    }  
  }
}
