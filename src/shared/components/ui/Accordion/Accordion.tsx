import { Children, useState } from 'react';
import { AccordionContext } from './accordion-context';
import { cn } from "@shared/utils/globals.util";
import { AccordionProps } from './types-accordion';

export function Accordion({ children, defaultIndex = 0 }: AccordionProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const totalItems = Children.count(children);

  return (
    <AccordionContext.Provider value={{ activeIndex, setActiveIndex, totalItems }}>
      <div className="relative">
        <div className={cn(
          "absolute left-5 top-[42px] bottom-6 w-[1px]",
          "bg-gray-200"
        )} />
        <div className="space-y-2">
          {children}
        </div>
      </div>
    </AccordionContext.Provider>
  );
}