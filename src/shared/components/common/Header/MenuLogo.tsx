import { cn } from '@shared/utils/globals.util';
import { useThemeStore } from '@store/ui/theme.store';
import { RiMenuUnfold2Line, RiMenuUnfoldLine } from "react-icons/ri";

const MenuLogo = () => {
  const menuIsOpen    = useThemeStore((state) => state.menuIsOpen);
  const setMenuIsOpen = useThemeStore((state) => state.setMenuIsOpen);
  const openMenu      = () => setMenuIsOpen(!menuIsOpen);
  
  return (
    <div className={cn("")}>
      <button
        className={cn("bg-secondary-800 p-2 rounded text-secondary-100")}
        onClick={openMenu}
      >
        { menuIsOpen ? <RiMenuUnfoldLine className='text-sm sm:text-base' /> : <RiMenuUnfold2Line className='text-sm sm:text-base' /> } 
      </button>
    </div>
  );
};

export default MenuLogo;