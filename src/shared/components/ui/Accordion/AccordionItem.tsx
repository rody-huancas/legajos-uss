import { useContext } from "react";
import { cn } from "@shared/utils/globals.util";
import { AccordionContext } from "./accordion-context";
import { AccordionItemProps } from "./types-accordion";
import { IoChevronDown, IoChevronBack, IoChevronForward } from "react-icons/io5";

export function AccordionItem({ title, children, index }: AccordionItemProps) {
  const context = useContext(AccordionContext);
  
  if (!context) throw new Error("AccordionItem must be used within Accordion");

  const { activeIndex, setActiveIndex, totalItems } = context;
  const isActive = activeIndex === index;
  const isLast = index === totalItems - 1;
  const showNavigation = totalItems > 1;

  return (
    <div>
      <button
        type="button"
        onClick={() => setActiveIndex(index)}
        className={cn(
          "flex items-center justify-between w-full py-3 text-left group"
        )}
      >
        <div className="flex items-center">
          <span
            className={cn(
              "flex items-center justify-center w-10 h-10 rounded-full",
              "bg-secondary-200 border border-gray-200 text-sm font-medium text-gray-800",
              "relative z-10 transition-colors",
              "group-hover:border-gray-300"
            )}
          >
            {index + 1}
          </span>
          <h3
            className={cn(
              "ml-4 text-base font-medium text-gray-600",
              "transition-colors",
              "group-hover:text-gray-900"
            )}
          >
            {title}
          </h3>
        </div>
        <IoChevronDown
          className={cn(
            "w-4 h-4 text-gray-400 transition-transform duration-200",
            isActive && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-200 ease-in-out",
          isActive ? "opacity-100" : "opacity-0 h-0"
        )}
      >
        <div className="pl-10 pr-4 pb-4">
          <div className="text-sm text-gray-500 leading-relaxed">
            {children}
          </div>
          {showNavigation && (
            <div className="flex justify-between mt-4 text-xs">
              {index > 0 && (
                <button
                  type="button"
                  onClick={() => setActiveIndex(index - 1)}
                  className={cn(
                    "flex items-center text-gray-500",
                    "hover:text-gray-900 transition-colors"
                  )}
                >
                  <IoChevronBack className="w-3 h-3 mr-1" />
                  Anterior
                </button>
              )}
              {!isLast && (
                <button
                  type="button"
                  onClick={() => setActiveIndex(index + 1)}
                  className={cn(
                    "flex items-center text-gray-500",
                    "hover:text-gray-900 transition-colors ml-auto"
                  )}
                >
                  Siguiente
                  <IoChevronForward className="w-3 h-3 ml-1" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
