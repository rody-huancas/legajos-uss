import { ExperienceUnivesityRepository } from "../repositories/experience-university.respository";
import { IExperienceUniversityPost, IExperienceUniversity } from "../models/experience-university.model";

export class ExperienceUnivesityService {
  constructor(private experienceUnivesityRepository: ExperienceUnivesityRepository) {}
  
  async getExperienceUniversity(ncodigo: number): Promise<IExperienceUniversity> {
    const response = await this.experienceUnivesityRepository.getExperienceUniversity(ncodigo);
    return response;
  }
  
  async getExperiencesUniversity(ncodigo: number): Promise<IExperienceUniversity[]> {
    const response = await this.experienceUnivesityRepository.getExperiencesUniversity(ncodigo);
    return response;
  }
  
  async getDedicationRegime() {
    const response = await this.experienceUnivesityRepository.getDedicationRegime();
    return response;
  }
  
  async getTeachingCategory() {
    const response = await this.experienceUnivesityRepository.getTeachingCategory();
    return response;
  }
  
  async registerExperienceUniversity(parnId: number | undefined, data: IExperienceUniversityPost) {
    const response = await this.experienceUnivesityRepository.registerExperienceUniversity(parnId, data);
    return response;
  }

  async updateDegreeTitle(id: number, data: IExperienceUniversityPost) {
    const response = await this.experienceUnivesityRepository.updateExperienceUniversity(id, data);
    return response;
  }
  
  async removeExperienceUniversity(parnId: number) {
    const response = await this.experienceUnivesityRepository.removeExperienceUniversity(parnId);
    return response;
  }
}
