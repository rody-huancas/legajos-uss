import { IUniversityAdministrativeBurden, IUniversityAdministrativeBurdenPost } from "../models/university-administrative-burden.model";
import { UniversityAdministrativeBurdenRepository } from "../repositories/university-administrative-burden.respository";

export class UniversityAdministrativeBurdenService {
  constructor(private universityAdministrativeBurdenRepository: UniversityAdministrativeBurdenRepository) {}
  
  async getLstUniversityAdministrativeBurden(ncodigo: number): Promise<IUniversityAdministrativeBurden[]> {
    const response = await this.universityAdministrativeBurdenRepository.getLstUniversityAdministrativeBurden(ncodigo);
    return response;
  }
  
  async getUniversityAdministrativeBurden(ncodigo: number): Promise<IUniversityAdministrativeBurden> {
    const response = await this.universityAdministrativeBurdenRepository.getUniversityAdministrativeBurden(ncodigo);
    return response;
  }

  async registerUniversityAdministrativeBurden(parnId: number | undefined, data: IUniversityAdministrativeBurdenPost) {
    const response = await this.universityAdministrativeBurdenRepository.registerUniversityAdministrativeBurden(parnId, data);
    return response;
  }

  async updateUniversityAdministrativeBurden(parnId: number | undefined, data: IUniversityAdministrativeBurdenPost) {
    const response = await this.universityAdministrativeBurdenRepository.updateUniversityAdministrativeBurden(parnId, data);
    return response;
  }

  async removeUniversityAdministrativeBurden(parnId: number) {
    const response = await this.universityAdministrativeBurdenRepository.removeUniversityAdministrativeBurden(parnId);
    return response;
  }
}
