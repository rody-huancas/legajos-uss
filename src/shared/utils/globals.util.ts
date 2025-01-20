import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { showNotification } from "./notification.util";

/**
 * Combina múltiples nombres de clase en una sola cadena, optimizando y resolviendo
 * conflictos en clases de Tailwind CSS.
 *
 * @param inputs - Nombres de clase o condiciones dinámicas para aplicarlas.
 * @returns Una cadena con las clases combinadas y optimizadas.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Genera las iniciales a partir de un nombre y un apellido.
 *
 * @param firstName - El nombre de la persona.
 * @param lastName - El apellido de la persona.
 * @returns Las iniciales en forma de cadena.
 */
export const getInitials = (firstName: string, lastName: string): string => {
  const firstInitial = lastName.trim().charAt(0).toUpperCase();
  const lastInitial  = firstName.trim().charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
};

/**
 * Codifica una cadena de texto a formato Base64.
 * 
 * @param str - La cadena de texto a codificar.
 * @returns La cadena codificada en Base64 o la original si hay error.
 */
export const encodeToBase64 = (str: string): string => {
  try {
    return btoa(str);
  } catch (error) {
    showNotification("error", "Ocurrió un error inesperado.")
    return str;
  }
};
