import { TeachingDedicationRegimeRepository } from "../repositories/teaching-dedication-regime.respository";
import { ITeachingDedicactionsRegime, ITeachingDedicactionsRegimePost } from "../models/teaching-dedication-regime.model";

export class TeachingDedicationRegimeService {
  constructor(private teachingDedicationRegimeRepository: TeachingDedicationRegimeRepository) {}
  
  async getTeachingDedicationsRegime(ncodigo: number): Promise<ITeachingDedicactionsRegime[]> {
    const response = await this.teachingDedicationRegimeRepository.getTeachingDedicationsRegime(ncodigo);
    return response;
  }
  
  async getTeachingDedicationRegime(ncodigo: number): Promise<ITeachingDedicactionsRegime> {
    const response = await this.teachingDedicationRegimeRepository.getTeachingDedicationRegime(ncodigo);
    return response;
  }

  async registerTeachingDedicationRegime(parnId: number | undefined, data: ITeachingDedicactionsRegimePost) {
    const response = await this.teachingDedicationRegimeRepository.registerTeachingDedicationRegime(parnId, data);
    return response;
  }

  async updateTeachingDedicationRegime(parnId: number | undefined, data: ITeachingDedicactionsRegimePost) {
    const response = await this.teachingDedicationRegimeRepository.updateTeachingDedicationRegime(parnId, data);
    return response;
  }

  async removeTeachingDedicationRegime(parnId: number) {
    const response = await this.teachingDedicationRegimeRepository.removeTeachingDedicationRegime(parnId);
    return response;
  }
}
