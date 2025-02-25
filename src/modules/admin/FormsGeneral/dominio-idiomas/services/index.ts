import { LanguageProficiencyService } from "./language-proficiency.service";
import { LanguageProficiencyRepository } from "../repositories/language-proficiency.respository";


const languageProficiencyRepository     = new LanguageProficiencyRepository();
export const languageProficiencyService = new LanguageProficiencyService(languageProficiencyRepository);
