import { createContext } from "react";
import { AccordionContextType } from "./types-accordion";

export const AccordionContext = createContext<AccordionContextType | undefined>(undefined);
