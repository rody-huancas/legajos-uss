import { InformationGeneralService } from "./information-general.service";
import { InformationGeneralRepository } from "../repositories/information-general.respository";

const informationGeneralRepository = new InformationGeneralRepository();
export const informationGeneralService = new InformationGeneralService(informationGeneralRepository);
