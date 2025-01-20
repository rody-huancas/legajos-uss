import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import { cn } from "@shared/utils/globals.util";
import { PHOTO_USS } from "@config/env.config";
import { useAuthStore } from "@store/auth/auth.store";
import { useThemeStore } from "@store/ui/theme.store";
import { RiArrowDownSLine, RiLogoutCircleLine, RiMenu3Line } from "react-icons/ri";
/* Styles */
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";

const Header = () => {
  const isMenuOpen    = useThemeStore((state) => state.menuIsOpen);
  const setMenuIsOpen = useThemeStore((state) => state.setMenuIsOpen);
  const user          = useAuthStore((state) => state.user);
  const logoutUser    = useAuthStore((state) => state.logoutUser);
  const photo         = `${PHOTO_USS}${user?.cPerCodigo}`;

  return (
    <header
      className={cn(
        "h-[7vh] md:h-[10vh] w-full bg-secondary-800 text-secondary-100 border-b border-secondary-100 p-8 flex items-center justify-between xl:justify-end"
      )}
    >
      <button
        onClick={() => setMenuIsOpen(!isMenuOpen)}
        className="bg-secondary-100 p-2 box-content rounded-xl text-secondary-800 xl:hidden"
      >
        {!isMenuOpen && <RiMenu3Line />}
      </button>

      <nav className="flex items-center gap-2">
        <Menu
          menuButton={
            <MenuButton className="flex items-center gap-x-2 hover:bg-secondary-300/15 p-2 rounded-lg transition-colors duration-300">
              <img
                src={photo}
                alt={`Foto del usuario ${user?.cPerNombre}`}
                className="w-8 h-8 object-contain rounded-full bg-secondary-100"
              />
              <span>{user?.cPerNombre}</span>
              <RiArrowDownSLine />
            </MenuButton>
          }
          align={"end"}
          gap={15}
          transition
          menuClassName="bg-secondary-100 p-4"
        >
          <MenuItem className="p-0 hover:bg-transparent">
            <div className="rounded-lg transition-colors cursor-auto text-gray-300 hover:bg-secondary-900 flex items-center gap-x-4 py-2 px-4 flex-1">
              <img
                src={photo}
                alt={`Foto del usuario ${user?.cPerNombre}`}
                className="w-14 h-14 object-contain rounded-full"
              />
              <div className="flex flex-col gap-1 text-sm">
                <span className="text-sm text-secondary-800/85 font-bold">
                  {user?.cPerNombre}<br />{user?.cPerApellido}
                </span>
                <span className="text-xs text-secondary-800/65 font-medium">
                  {user?.cPerEmail}
                </span>
              </div>
            </div>
          </MenuItem>

          <hr className="my-4 border-gray-300" />

          <MenuItem className="p-0 hover:bg-transparent">
            <button
              onClick={logoutUser}
              className="rounded-lg transition-colors text-secondary-800/70 hover:bg-secondary-800/5 flex items-center gap-x-4 py-2 px-4 flex-1"
            >
              <RiLogoutCircleLine /> Logout
            </button>
          </MenuItem>
        </Menu>
      </nav>
    </header>
  );
};

export default Header;
