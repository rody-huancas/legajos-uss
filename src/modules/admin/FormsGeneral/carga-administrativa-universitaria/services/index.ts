import { UniversityAdministrativeBurdenService } from "./university-administrative-burden.service";
import { UniversityAdministrativeBurdenRepository } from "../repositories/university-administrative-burden.respository";

const  universityAdministrativeBurdenRepository    = new UniversityAdministrativeBurdenRepository();
export const universityAdministrativeBurdenService = new UniversityAdministrativeBurdenService(universityAdministrativeBurdenRepository);
