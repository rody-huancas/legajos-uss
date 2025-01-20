import { z, ZodSchema } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormProps } from "react-hook-form";

/**
 * Hook global para configurar formularios con la librería react-hook-form y zod.
 * 
 * @param schema - El esquema de validación de Zod.
 * @param options - Opciones adicionales para react-hook-form.
 * @returns Configuración del formulario.
 */
export function useZodForm<TSchema extends ZodSchema>(schema: TSchema, options?: Omit<UseFormProps<z.infer<TSchema>>, "resolver">) {
  return useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    ...options,
  });
}
