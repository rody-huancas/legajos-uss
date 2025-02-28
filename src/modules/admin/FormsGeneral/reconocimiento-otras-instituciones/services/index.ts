import { RecognitionOtherInstitutionsService } from "./recognition-other-institution.service";
import { RecognitionOtherInstitutionsRepository } from "../repositories/recognition-other-institution.respository";

const  recognitionOtherInstitutionsRepository    = new RecognitionOtherInstitutionsRepository();
export const recognitionOtherInstitutionsService = new RecognitionOtherInstitutionsService(recognitionOtherInstitutionsRepository);
