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
