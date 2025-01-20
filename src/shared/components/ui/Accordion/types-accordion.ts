import { ReactNode } from "react";

export interface AccordionContextType {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  totalItems: number;
}

export interface AccordionProps {
  children: ReactNode;
  defaultIndex?: number;
}

export interface AccordionItemProps {
  title: string;
  children: ReactNode;
  index: number;
}
