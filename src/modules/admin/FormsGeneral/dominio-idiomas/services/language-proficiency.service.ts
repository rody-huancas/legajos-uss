import { ILanguageProficiency, ILanguageProficiencyPost } from "../models/language-proficiency.model";
import { LanguageProficiencyRepository } from "../repositories/language-proficiency.respository";


export class LanguageProficiencyService {
  constructor(private languageProficiencyRepository: LanguageProficiencyRepository) {}
  
  async getLstLanguageProficiencies(ncodigo: number): Promise<ILanguageProficiency[]> {
    const response = await this.languageProficiencyRepository.getLstLanguageProficiencies(ncodigo);
    return response;
  }

  async getLanguageProficiency(ncodigo: number): Promise<ILanguageProficiency> {
    const response = await this.languageProficiencyRepository.getLanguageProficiency(ncodigo);
    return response;
  }

  async registerLanguageProficiency(parnId: number, data: ILanguageProficiencyPost) {
    const response = await this.languageProficiencyRepository.registerLanguageProficiency(parnId, data);
    return response;
  }

  async updateLanguageProficiency(parnId: number, data: ILanguageProficiencyPost) {
    const response = await this.languageProficiencyRepository.updateLanguageProficiency(parnId, data);
    return response;
  }

  async removeLanguageProficiency(parnId: number) {
    const response = await this.languageProficiencyRepository.removeLanguageProficiency(parnId);
    return response;
  }
}
