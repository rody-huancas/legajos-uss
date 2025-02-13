import { ITeachingCategory, ITeachingCategoryPost } from "../models/teaching-category.model";
import { TeachingCategoryRepository } from "../repositories/teaching-category.respository";

export class TeachingCategoryService {
  constructor(private teachingCategoryRepository: TeachingCategoryRepository) {}
  
 async getTeachingCategories(ncodigo: number): Promise<ITeachingCategory[]> {
    const response = await this.teachingCategoryRepository.getTeachingCategories(ncodigo);
    return response;
  }

  async registerTeachingCategory(parnId: number | undefined, data: ITeachingCategoryPost) {
    const response = await this.teachingCategoryRepository.registerTeachingCategory(parnId, data);
    return response;
  }

  async removeTeachingCategory(parnId: number) {
    const response = await this.teachingCategoryRepository.removeTeachingCategory(parnId);
    return response;
  }
}
