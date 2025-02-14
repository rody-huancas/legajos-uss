import { NoTeachingProfessionalExperienceRepository } from '../repositories/no-teaching-professional-experience.respository';
import { INoTeachigProfessionalExperiencePost, INoTeachingProfesionalExperiences } from '../models/no-teaching-profesional-exprience.model';

export class NoTeachingProfessionalExperienceService {
  constructor(private noTeachingProfessionalExperienceRepository: NoTeachingProfessionalExperienceRepository) {}
  
  async getLstNoTeachingProfessionalExperience(ncodigo: number): Promise<INoTeachingProfesionalExperiences[]> {
    const response = await this.noTeachingProfessionalExperienceRepository.getLstNoTeachingProfessionalExperience(ncodigo);
    return response;
  }
  
  async getNoTeachingProfessionalExperience(ncodigo: number): Promise<INoTeachingProfesionalExperiences> {
    const response = await this.noTeachingProfessionalExperienceRepository.getNoTeachingProfessionalExperience(ncodigo);
    return response;
  }

  async registerNoTeachingProfessionalExperience(parnId: number | undefined, data: INoTeachigProfessionalExperiencePost) {
    const response = await this.noTeachingProfessionalExperienceRepository.registerNoTeachingProfessionalExperience(parnId, data);
    return response;
  }

  async updateNoTeachingProfessionalExperience(parnId: number | undefined, data: INoTeachigProfessionalExperiencePost) {
    const response = await this.noTeachingProfessionalExperienceRepository.updateNoTeachingProfessionalExperience(parnId, data);
    return response;
  }

  async removeNoTeachingProfessionalExperience(parnId: number) {
    const response = await this.noTeachingProfessionalExperienceRepository.removeNoTeachingProfessionalExperience(parnId);
    return response;
  }
}
