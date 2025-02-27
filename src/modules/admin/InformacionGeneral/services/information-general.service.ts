import { showNotification } from "@shared/utils/notification.util";
import { InformationGeneralRepository } from "../repositories/information-general.respository";

export class InformationGeneralService {
  constructor(private InformationGeneralRepository: InformationGeneralRepository) {}
  
  async getGeneralInformation(cPerCodigo: string) {
    try {
      const response = await this.InformationGeneralRepository.getGeneralInformation(cPerCodigo);
      return response;
    } catch (error) {
      showNotification("error", "Ocurrió un error al mostrar los grados académicos.");
    }  
  }
  
  async getAcademicDegree() {
    try {
      const response = await this.InformationGeneralRepository.getAcademicDegree();
      const data = response.filter(res => res.nIntCodigo !== 0);
      return data;
    } catch (error) {
      showNotification("error", "Ocurrió un error al mostrar los grados académicos.");
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

  async getCountries() {
    try {
      const response = await this.InformationGeneralRepository.getCountries();
      return response;
    } catch (error) {
      showNotification("error", "Ocurrió un error al mostrar las nacionalidades.");
    }
  }
  
  async getMaritalStatus() {
    try {
      const response = await this.InformationGeneralRepository.getMaritalStatus();
      const data = response.filter(res => res.nConValor !== 0);
      return data;
    } catch (error) {
      showNotification("error", "Ocurrió un error al mostrar el estado civil.");
    }  
  }
  
  async getSexo() {
    try {
      const response = await this.InformationGeneralRepository.getSexo();
      const data = response.filter(res => res.nConValor !== 0);
      return data;
    } catch (error) {
      showNotification("error", "Ocurrió un error al mostrar el sexo.");
    }  
  }
  
  async getZoneType() {
    try {
      const response = await this.InformationGeneralRepository.getZoneType();
      const data = response.filter(res => res.nConValor !== 0);
      return data;
    } catch (error) {
      showNotification("error", "Ocurrió un error al mostrar el tipo de zona.");
    }  
  }
  
  async getStreetType() {
    try {
      const response = await this.InformationGeneralRepository.getStreetType();
      const data = response.filter(res => res.nConValor !== 0);
      return data;
    } catch (error) {
      showNotification("error", "Ocurrió un error al mostrar el tipo de calle.");
    }  
  }
  
  async getLanguage() {
    try {
      const response = await this.InformationGeneralRepository.getLanguage();
      return response;
    } catch (error) {
      showNotification("error", "Ocurrió un error al mostrar los idiomas.");
    }  
  }

  async getInstitution() {
    try {
      const response = await this.InformationGeneralRepository.getInstitution();
      return response;
    } catch (error) {
      showNotification("error", "Ocurrió un error al mostrar las instituciones.");
    }  
  }

  async getLanguageProficiency() {
    try {
      const response = await this.InformationGeneralRepository.getLanguageProficiency();
      return response;
    } catch (error) {
      showNotification("error", "Ocurrió un error al mostrar los idiomas.");
    }
  }

  async getOfficeSkills() {
    try {
      const response = await this.InformationGeneralRepository.getOfficeSkills();
      return response;
    } catch (error) {
      showNotification("error", "Ocurrió un error al mostrar las habilidades.");
    }
  }

  async getInformatic() {
    try {
      const response = await this.InformationGeneralRepository.getInformatic();
      return response;
    } catch (error) {
      showNotification("error", "Ocurrió un error al mostrar las opciones de informática.");
    }
  }

  async getAcademicPositions() {
    try {
      const response = await this.InformationGeneralRepository.getAcademicPositions();
      return response;
    } catch (error) {
      showNotification("error", "Ocurrió un error al mostrar las opciones cargos acádemicos.");
    }
  }
}
