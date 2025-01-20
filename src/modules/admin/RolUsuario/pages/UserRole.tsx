import { useEffect, useState } from "react";
/* Libraries */
import { useNavigate } from "react-router-dom";
import { useZodForm } from "@shared/hooks/useZodForm";
/* Components */
import Button from "@shared/components/ui/Button/Button";
import ReactSelect from "@shared/components/ui/ReactSelect/ReactSelect";
import ModalSwornDeclaration from "../components/ModalSwornDeclaration";
/* Layouts */
import AuthBGLayout from "@layouts/auth/AuthBGLayout";
/* Validations */
import { userRoleSchema, UserRoleSchemaType } from "../validation/user-role.validation";
/* Services */
import { rolUserService } from "../services";
/* Store */
import { useAuthStore } from "@store/auth/auth.store";
/* Models */
import { PropsResponseRolUser } from "../models/rol-user.model";
/* Utils */
import { showNotification } from "@shared/utils/notification.util";
/* Icons */
import { IoIosLogOut } from "react-icons/io";

type Option = {
  value: string;
  label: string;
};

const UserRol = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const logoutUser = useAuthStore((state) => state.logoutUser);
  const setProfile = useAuthStore(state => state.setProfile);
  
  const [open, setOpen] = useState<boolean>(true);
  const [roleOptions, setRoleOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { control, handleSubmit, formState: { errors } } = useZodForm(userRoleSchema, {
    defaultValues: { select: undefined }, 
  });

  const handleModal = () => setOpen(!open);

  useEffect(() => {
    const fetchUserType = async() => {
      setIsLoading(true);
      try {
        const data = { cPerCodigo: user?.cPerCodigo! };
        const { odata } = await rolUserService.getUserType(data);
        
        const availableRoles: Option[] = [];
        
        if (odata.some((item: PropsResponseRolUser) => item.nPerRelacion === "1")) {
          availableRoles.push({ value: "1", label: "Administrativo" });
        }
        if (odata.some((item: PropsResponseRolUser) => item.nPerRelacion === "2")) {
          availableRoles.push({ value: "2", label: "Docente" });
        }

        setRoleOptions(availableRoles);
        setIsLoading(false);
      } catch (error) {
        showNotification('warning','Ocurrió un error al cargar los roles');
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserType();
  }, [user?.cPerCodigo]);

  const onSubmit = (data: UserRoleSchemaType) => {
    setProfile(data.select.value);

    switch (data.select.value) {
      case "1":
        navigate("/");
        break;
        
      default:
        navigate("/dgeneral");
        break;
    }
  };
  
  return (
    <AuthBGLayout>
      <header className="w-full p-5 bg-white shadow-sm absolute top-0 left-0 flex items-center justify-end">
        <Button variant="destructive" size="lg" className="gap-2" onClick={logoutUser}>
          <IoIosLogOut size={20} />
          Cerrar Sesión
        </Button>
      </header>

      <section className="h-screen w-full flex items-center justify-center px-5">
        <div className="bg-white shadow-lg z-20 rounded-xl w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3">
          <div className="w-full bg-secondary-800 text-secondary-100 p-5 rounded-t-lg">
            <h2 className="text-center font-black text-2xl uppercase">Roles</h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 px-10 py-7">
            <ReactSelect
              name="select"
              control={control}
              options={roleOptions}
              placeholder="Perfil con el que desea ingresar"
              errorMessage={errors.select?.message}
              isLoading={isLoading}
            />
            <Button className="h-11 uppercase">Continuar</Button>
          </form>
          <hr />
          <div className="p-3">
            <p className="text-center text-sm text-secondary-800/70">webmaster@uss.edu.pe</p>
          </div>
        </div>
      </section>
      { open && <ModalSwornDeclaration isOpen={open} onClose={handleModal} /> }
    </AuthBGLayout>
  );
};

export default UserRol;