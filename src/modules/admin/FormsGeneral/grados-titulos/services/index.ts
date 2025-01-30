import { DegreesTitlesService } from "./degrees-titles.service";
import { DegreesTitlesRepository } from "../repositories/degrees-titles.respository";

const degreesTitlesRepository = new DegreesTitlesRepository();
export const degreesTitleService = new DegreesTitlesService(degreesTitlesRepository);
