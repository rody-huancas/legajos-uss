import { LoginRepository } from "@modules/authentication/login/repositories/login.repository";
import { LoginService } from "@modules/authentication/login/services/login.service";

const loginRepository = new LoginRepository();
export const loginService = new LoginService(loginRepository);
