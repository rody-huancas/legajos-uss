import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { showNotification } from "./notification.util";

/*
Combina múltiples nombres de clase en una sola cadena, optimizando y resolviendo
*/
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/*
Genera las iniciales a partir de un nombre y un apellido.
*/
export const getInitials = (firstName: string, lastName: string): string => {
  const firstInitial = lastName.trim().charAt(0).toUpperCase();
  const lastInitial  = firstName.trim().charAt(0).toUpperCase();
  return `${firstInitial}${lastInitial}`;
};

/*
Codifica una cadena de texto a formato Base64
*/
export const encodeToBase64 = (str: string): string => {
  try {
    return btoa(str);
  } catch (error) {
    showNotification("error", "Ocurrió un error inesperado.");
    return str;
  }
};

/*
Calcular la edad en base a la fecha
*/

export const calculateAge = (birthDate: Date): number => {
  const today      = new Date();
  const birthYear  = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth();
  const birthDay   = birthDate.getDate();

  let age = today.getFullYear() - birthYear;

  if (
    today.getMonth() < birthMonth ||
    (today.getMonth() === birthMonth && today.getDate() < birthDay)
  ) {
    age--;
  }

  return age;
};

/**
 * Formatea una fecha en diferentes formatos.
 * @param date - La fecha a formatear (puede ser un objeto Date, una cadena ISO o un timestamp).
 * @param format - El formato deseado:
 *   - "short": Formato corto (10/10/2025 o 14-10-2025).
 *   - "long": Formato largo (10 de agosto de 2025).
 * @param separator - El separador para el formato corto (por defecto es "/").
 * @returns La fecha formateada como una cadena.
 */
export const formatDate = ( date: Date | string | number, format: "short" | "long" = "short", separator: string = "/" ): string => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    throw new Error("Fecha no válida");
  }

  if (format === "short") {
    const day = parsedDate.getDate().toString().padStart(2, "0");
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
    const year = parsedDate.getFullYear();

    return `${day}${separator}${month}${separator}${year}`;
  } else if (format === "long") {
    const formatter = new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formatter.format(parsedDate);
  }

  throw new Error("Formato no válido");
};