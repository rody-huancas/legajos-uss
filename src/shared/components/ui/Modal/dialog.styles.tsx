import { cva } from "class-variance-authority";
import { CiWarning } from "react-icons/ci";

export const dialogStyles = cva("flex items-start", {
  variants: {
    type: {
      delete : "text-red-600",
      warning: "text-yellow-600",
      success: "text-green-600",
      info   : "text-blue-600",
    },
  },
  defaultVariants: {
    type: "info",
  },
});

export const dialogIcons = {
  delete : <CiWarning className = "mr-3 size-8 text-red-600" />,
  warning: <CiWarning className = "mr-3 size-8 text-yellow-600" />,
  success: <CiWarning className = "mr-3 size-8 text-green-600" />,
  info   : <CiWarning className = "mr-3 size-8 text-blue-600" />,
};
