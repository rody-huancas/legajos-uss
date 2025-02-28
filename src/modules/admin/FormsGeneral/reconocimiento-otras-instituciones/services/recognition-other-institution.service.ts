import { RecognitionOtherInstitutionsRepository } from "../repositories/recognition-other-institution.respository";
import { IRecognitionOtherInstitutionPost, IRecognitionOtherInstitutions } from "../models/recognition-other-institution.model";


export class RecognitionOtherInstitutionsService {
  constructor(private recognitionOtherInstitutionsRepository: RecognitionOtherInstitutionsRepository) {}
  
  async getLstRecognitionOtherInstitutions(ncodigo: number): Promise<IRecognitionOtherInstitutions[]> {
    const response = await this.recognitionOtherInstitutionsRepository.getLstRecognitionOtherInstitutions(ncodigo);
    return response;
  }
  
  async getRecognitionOtherInstitution(ncodigo: number): Promise<IRecognitionOtherInstitutions> {
    const response = await this.recognitionOtherInstitutionsRepository.getRecognitionOtherInstitution(ncodigo);
    return response;
  }

  async registerRecognitionOtherInstitutions(parnId: number | undefined, data: IRecognitionOtherInstitutionPost) {
    const response = await this.recognitionOtherInstitutionsRepository.registerRecognitionOtherInstitutions(parnId, data);
    return response;
  }

  async updateRecognitionOtherInstitutions(parnId: number | undefined, data: IRecognitionOtherInstitutionPost) {
    const response = await this.recognitionOtherInstitutionsRepository.updateRecognitionOtherInstitutions(parnId, data);
    return response;
  }

  async removeRecognitionOtherInstitution(parnId: number) {
    const response = await this.recognitionOtherInstitutionsRepository.removeRecognitionOtherInstitution(parnId);
    return response;
  }
}
