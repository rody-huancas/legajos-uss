import { InformationGeneralRepository } from "../repositories/information-general.respository";
import { InformationGeneralService } from "./information-general.service";

const informationGeneralRepository = new InformationGeneralRepository();
export const informationGeneralService = new InformationGeneralService(informationGeneralRepository);
