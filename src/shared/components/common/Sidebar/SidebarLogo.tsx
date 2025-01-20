import { useThemeStore } from "@store/ui/theme.store";
import { RiCloseLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const SidebarLogo = () => {
  const isMenuOpen = useThemeStore((state) => state.menuIsOpen);
  const setMenuIsOpen = useThemeStore((state) => state.setMenuIsOpen);

  return (
    <div className="w-full flex justify-between xl:justify-center items-center mb-10">
      <Link
        to="/"
        className="flex justify-center items-end text-2xl font-bold text-white"
      >
        <img
          src="/logo-uss.jpg"
          alt="logo USS"
          className="w-52 rounded border border-5 border-white"
        />
      </Link>

      <button
        onClick={() => setMenuIsOpen(!isMenuOpen)}
        className="bg-secondary-100 p-2 box-content rounded-xl xl:hidden"
      >
        {isMenuOpen && <RiCloseLine size={20} />}
      </button>
    </div>
  );
};

export default SidebarLogo;
