import { DegreesTitlesRepository } from "../repositories/degrees-titles.respository";
import { IDataDegreesTitle, IRegisterDegreesTitle } from "../models/degrees-title.model";

export class DegreesTitlesService {
  constructor(private degreesTitlesRepository: DegreesTitlesRepository) {}
  
  async getDegreeTitle(ncodigo: number): Promise<IDataDegreesTitle> {
    const response = await this.degreesTitlesRepository.getDegreeTitle(ncodigo);
    return response;
  }

  async getDegreesTitles(ncodigo: number): Promise<IDataDegreesTitle[]> {
    const response = await this.degreesTitlesRepository.getDegreesTitles(ncodigo);
    return response;
  }

  async registerDegreeTitle(id: number, data: IRegisterDegreesTitle) {
    const response = await this.degreesTitlesRepository.registerDegreeTitle(id, data);
    return response;
  }

  async updateDegreeTitle(id: number, data: IRegisterDegreesTitle) {
    const response = await this.degreesTitlesRepository.updateDegreeTitle(id, data);
    return response;
  }

  async removeDegreeTitle(id: number) {
    const response = await this.degreesTitlesRepository.removeDegreeTitle(id);
    return response;
  }
}
