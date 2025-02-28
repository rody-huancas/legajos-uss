import { SocialProjectionService } from "./social-projection.service";
import { SocialProjectionRepository } from "../repositories/social-projection.respository";

const  socialProjectionRepository    = new SocialProjectionRepository();
export const socialProjectionService = new SocialProjectionService(socialProjectionRepository);
