/* Components */
import SidebarLink from "./SidebarLink";
import SidebarLogo from "./SidebarLogo";
/* Utils */
import { cn } from "@shared/utils/globals.util";
import { useAuthStore } from "@store/auth/auth.store";
import { useThemeStore } from "@store/ui/theme.store";
/* Icons */
import { GiArchiveResearch, GiVideoConference } from "react-icons/gi";
import { RiFolderInfoLine, RiLogoutCircleLine } from "react-icons/ri";

const Sidebar = () => {
  const isMenuOpen    = useThemeStore((state) => state.menuIsOpen);
  const setMenuIsOpen = useThemeStore((state) => state.setMenuIsOpen);
  const logoutUser    = useAuthStore((state) => state.logoutUser);

  return (
    <>
      {
        isMenuOpen && (
          <div className="fixed bg-[#2524243d] w-full h-full z-30 xl:hidden" onClick={() => setMenuIsOpen(false)} />
        )
      }

      <div
        className={cn(
          "h-dvh overflow-y-auto fixed w-content xl:w-content top-0 xl:left-0 bg-secondary-800 p-4 flex flex-col justify-between z-50 transition-all duration-300",
          isMenuOpen ? "left-0" : "-left-full"
        )}
      >
        <div className="space-y-1">
          <SidebarLogo />

          <span className="text-xs uppercase text-secondary-100/70 font-bold plc">
            Legajos
          </span>
          <ul className="text-secondary-100 ml-5 space-y-1">
            <li>
              <SidebarLink to="/legajo" name="Control de Legajos" icon={RiFolderInfoLine} onClick={() => setMenuIsOpen(false)} />
            </li>
            <li>
              <SidebarLink to="/dgeneral" name="Información General" icon={RiFolderInfoLine} onClick={() => setMenuIsOpen(false)} />
            </li>
            <li>
              <SidebarLink to="/dcapacitaciones" name="Capacitación" icon={GiVideoConference} onClick={() => setMenuIsOpen(false)} />
            </li>
            <li>
              <SidebarLink to="/dinvestigacion" name="Investigación" icon={GiArchiveResearch} onClick={() => setMenuIsOpen(false)} />
            </li>
          </ul>
        </div>

        <button
          onClick={logoutUser}
          className={cn(
            "flex items-center gap-4 py-2 px-4 rounded-lg transition-colors duration-300 text-secondary-100",
            "hover:bg-secondary-100/10"
          )}
        >
          <RiLogoutCircleLine className="text-primary-200" /> Cerrar Sesión
        </button>
      </div>
    </>
  );
};

export default Sidebar;
