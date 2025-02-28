import { SocialProjectionRepository } from "../repositories/social-projection.respository";
import { ISocialProjection, ISocialProjectionPost } from "../models/social-projection.model";

export class SocialProjectionService {
  constructor(private socialProjectionRepository: SocialProjectionRepository) {}
  
  async getLstSocialProjections(ncodigo: number): Promise<ISocialProjection[]> {
    const response = await this.socialProjectionRepository.getLstSocialProjections(ncodigo);
    return response;
  }
  
  async getSocialProjection(ncodigo: number): Promise<ISocialProjection> {
    const response = await this.socialProjectionRepository.getSocialProjection(ncodigo);
    return response;
  }

  async registerSocialProjection(parnId: number | undefined, data: ISocialProjectionPost) {
    const response = await this.socialProjectionRepository.registerSocialProjection(parnId, data);
    return response;
  }

  async updateSocialProjection(parnId: number | undefined, data: ISocialProjectionPost) {
    const response = await this.socialProjectionRepository.updateSocialProjection(parnId, data);
    return response;
  }

  async removeSocialProjection(parnId: number) {
    const response = await this.socialProjectionRepository.removeSocialProjection(parnId);
    return response;
  }
}
