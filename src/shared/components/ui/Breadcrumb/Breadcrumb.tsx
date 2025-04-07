import { Link } from "react-router-dom";
import { IconType } from "react-icons";
import { cn } from "@shared/utils/globals.util";
import { RiHomeLine } from "react-icons/ri";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

interface BreadcrumbItem {
  name: string;
  path?: string;
  icon?: IconType;
}

interface Props {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb = ({ items, className }: Props) => {
  const allItems = [{ name: "Inicio", path: "/", icon: RiHomeLine }, ...items];

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center flex-wrap gap-y-2 whitespace-nowrap">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const Icon = item.icon;

          return (
            <li key={index} className="inline-flex items-center">
              {!isLast ? (
                <>
                  <Link
                    to={item.path || "#"}
                    className={cn(
                      "flex items-center gap-1 text-sm hover:text-blue-600 focus:outline-none focus:text-blue-600 transition-colors",
                      index === 0 ? "text-gray-500" : "text-gray-600"
                    )}
                  >
                    {Icon && <Icon size={16} className="shrink-0" />}
                    {item.name}
                  </Link>
                  {!isLast && (
                    <MdOutlineKeyboardArrowRight
                      size={18}
                      className="mx-1 text-gray-400"
                      aria-hidden="true"
                    />
                  )}
                </>
              ) : (
                <span
                  className={cn(
                    "text-sm text-gray-800 truncate",
                    isLast && "font-semibold"
                  )}
                  aria-current="page"
                >
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
