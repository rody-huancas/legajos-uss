import { TeachingCategoryService } from "./teaching-category.service";
import { TeachingCategoryRepository } from "../repositories/teaching-category.respository";

const  teachingCategoryRepository    = new TeachingCategoryRepository();
export const teachingCategoryService = new TeachingCategoryService(teachingCategoryRepository);
