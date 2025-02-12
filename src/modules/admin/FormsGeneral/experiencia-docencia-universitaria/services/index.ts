import { ExperienceUnivesityService } from "./experience-university.service";
import { ExperienceUnivesityRepository } from "../repositories/experience-university.respository";

const  experienceUnivesityRepository    = new ExperienceUnivesityRepository();
export const experienceUnivesityService = new ExperienceUnivesityService(experienceUnivesityRepository);
