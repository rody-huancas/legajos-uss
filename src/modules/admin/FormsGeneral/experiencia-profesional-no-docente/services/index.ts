import { NoTeachingProfessionalExperienceRepository } from '../repositories/no-teaching-professional-experience.respository';
import { NoTeachingProfessionalExperienceService } from './no-teaching-professional-experience.service';

const  noTeachingProfessionalExperienceRepository    = new NoTeachingProfessionalExperienceRepository();
export const noTeachingProfessionalExperienceService = new NoTeachingProfessionalExperienceService(noTeachingProfessionalExperienceRepository);
