import { cn } from "@shared/utils/globals.util";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

interface Props {
  to      : string;
  name    : string;
  icon    : IconType;
  onClick?: () => void;
}

const SidebarLink = ({ icon: Icon, name, to, onClick }: Props) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-4 py-2 px-4 rounded-lg transition-colors duration-300",
        "hover:bg-secondary-300/5"
      )}
      onClick={onClick}
    >
      <Icon className="text-primary-200" size={18} /> {name}
    </Link>
  );
};

export default SidebarLink;
