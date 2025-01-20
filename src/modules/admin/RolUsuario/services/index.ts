import { RolUserService } from "./rol-user.service";
import { RolUserRepository } from "../repositories/rol-user.repository";

const rolUserRepository = new RolUserRepository();
export const rolUserService = new RolUserService(rolUserRepository);
