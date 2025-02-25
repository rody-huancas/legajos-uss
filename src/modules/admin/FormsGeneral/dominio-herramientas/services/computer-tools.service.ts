import { ComputerToolsRepository } from "../repositories/computer-tools.respository";
import { IComputerTools, IComputerToolsPost } from "../models/computer-tools.model";

export class ComputerToolsService {
  constructor(private computerToolsRepository: ComputerToolsRepository) {}
  
  async getLstComputerTools(ncodigo: number): Promise<IComputerTools[]> {
    const response = await this.computerToolsRepository.getLstComputerTools(ncodigo);
    return response;
  }

  async getComputerTool(ncodigo: number): Promise<IComputerTools> {
    const response = await this.computerToolsRepository.getComputerTool(ncodigo);
    return response;
  }

  async registerComputerTools(parnId: number, data: IComputerToolsPost) {
    const response = await this.computerToolsRepository.registerComputerTools(parnId, data);
    return response;
  }

  async updateComputerTools(parnId: number, data: IComputerToolsPost) {
    const response = await this.computerToolsRepository.updateComputerTools(parnId, data);
    return response;
  }

  async removeComputerTools(parnId: number) {
    const response = await this.computerToolsRepository.removeComputerTools(parnId);
    return response;
  }
}
