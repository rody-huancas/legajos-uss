import { useState, ReactNode } from 'react';
import { cn } from "@shared/utils/globals.util";
/* Icons */
import { IconType } from 'react-icons';
import { TbChevronDown } from "react-icons/tb";

interface SidebarDropdownItemProps {
  icon?: IconType;
  label: string;
  children: ReactNode;
  defaultOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

const SidebarDropdownItem: React.FC<SidebarDropdownItemProps> = (props) => {
    const { icon: Icon, label, children,defaultOpen = false, onToggle } = props
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    onToggle?.(newState);
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={handleToggle}
        className="w-full text-sm px-4 py-2.5 flex items-center justify-between rounded-lg bg-secondary-100 text-secondary-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-secondary-600"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon size={20} aria-hidden="true" />}
          <span>{label}</span>
        </div>
        <TbChevronDown 
          className={cn(
            "transition-transform duration-300",
            isOpen && "rotate-180"
          )}
          size={20}
          aria-hidden="true"
        />
      </button>
      
      <div 
        className={cn(
          "overflow-hidden transition-all duration-300 mt-3 rounded-lg bg-black/50",
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}
        role="region"
        aria-labelledby={`${label}-content`}
      >
        <div className="pl-8 py-2 text-xs flex flex-col gap-1">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SidebarDropdownItem;