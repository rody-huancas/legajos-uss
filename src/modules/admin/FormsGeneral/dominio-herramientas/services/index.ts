import { ComputerToolsService } from "./computer-tools.service";
import { ComputerToolsRepository } from "../repositories/computer-tools.respository";

const computerToolsRepository     = new ComputerToolsRepository();
export const computerToolsService = new ComputerToolsService(computerToolsRepository);
