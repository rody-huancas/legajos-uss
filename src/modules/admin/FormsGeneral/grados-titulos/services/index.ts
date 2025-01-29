import { DegreesTitlesRepository } from "../repositories/degrees-titles.respository";
import { DegreesTitlesService } from "./degrees-titles.service";

const degreesTitlesRepository = new DegreesTitlesRepository();
export const degreesTitleService = new DegreesTitlesService(degreesTitlesRepository);
