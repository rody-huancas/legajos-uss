import { TeachingDedicationRegimeService } from "./teaching-dedication-regime.service";
import { TeachingDedicationRegimeRepository } from "../repositories/teaching-dedication-regime.respository";

const  teachingDedicationRegimeRepository    = new TeachingDedicationRegimeRepository();
export const teachingDedicationRegimeService = new TeachingDedicationRegimeService(teachingDedicationRegimeRepository);
