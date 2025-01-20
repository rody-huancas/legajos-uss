import { LoginRepository } from "../repositories";
import { ILoginCredentials } from "../models";
import { showNotification } from "@shared/utils/notification.util";

export class LoginService {
  constructor(private loginRepository: LoginRepository) {}

  /**
   * Realiza la autenticación del usuario con las credenciales proporcionadas.
   *
   * @param credentials - Objeto con las credenciales del usuario.
   * @returns La respuesta del repositorio en caso de éxito.
   */
  async login(credentials: ILoginCredentials) {
    try {
      const response = await this.loginRepository.login(credentials);
      return response;
    } catch (error) {
      showNotification("error", "Ocurrió un error desconocido.");
    }
  }
}
