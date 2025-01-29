import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@shared/components/ui/Button/Button";
import InputField from "@shared/components/ui/InputField/InputField";

import { useAuthStore } from "@store/auth/auth.store";
import { useZodForm } from "@shared/hooks/useZodForm";
import { encodeToBase64 } from "@shared/utils/globals.util";
import { loginSchema, LoginSchemaType } from "../validation/login.validation";

import { RiLoaderLine } from "react-icons/ri";

const Login = () => {
  const navigate = useNavigate();
  const [load, setLoad] = useState<boolean>(false)

  const { loginUser } = useAuthStore();
  const { handleSubmit, register, formState: { errors }, } = useZodForm(loginSchema);

  const onSubmit = async (data: LoginSchemaType) => {
    const { pcPerUsuCodigo, pcPerUsuClave } = data;
    const encodedPassword = encodeToBase64(pcPerUsuClave);

    setLoad(true);
    await loginUser(pcPerUsuCodigo, encodedPassword);
    setLoad(false);
    navigate("/rol-por-usuario");
  }
  return (
    <div className="w-full min-h-full space-y-7">
      <div className="w-full flex justify-center">
        <img src="/logo-uss.jpg" alt="Logo USS" />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
        <div className="space-y-5">
          <InputField label="Usuario" name="pcPerUsuCodigo" placeholder="Ingrese su usuario" register={register} error={errors.pcPerUsuCodigo}/>
          <InputField label="Contraseña" name="pcPerUsuClave" placeholder="Ingrese su contraseña" type="password" register={register} error={errors.pcPerUsuClave}/>
        </div>

        <Button type="submit" variant="default" size="xl" className="w-full uppercase gap-2" disabled={load}>
          { load && <RiLoaderLine className="animate-spin" size={18} /> }
          { load ? "Ingresando" : "Ingresar" }
        </Button>
      </form>
    </div>
  );
};

export default Login;
