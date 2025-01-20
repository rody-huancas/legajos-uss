import { PropsRolUser } from "../models/rol-user.model";
import { showNotification } from "@shared/utils/notification.util";
import { RolUserRepository } from "../repositories/rol-user.repository";

export class RolUserService {
  constructor(private rolUserRepository: RolUserRepository) {}

  // Obtener el tipo de usuario
  async getUserType(user: PropsRolUser) {
    try {
      const response = await this.rolUserRepository.getUserType(user);
      return response;
    } catch (error) {
      showNotification("error", "Ocurrió un error desconocido.");
    }
  }

  // Enviar declaración jurada
  async swornDeclaration(rolUser: PropsRolUser) {
    try {
      const response = await this.rolUserRepository.swornDeclaration(rolUser);
      return response;
    } catch (error) {
      showNotification("error", "Ocurrió un error desconocido.");
    }
  }
}
