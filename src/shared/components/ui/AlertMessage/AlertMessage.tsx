import { cn } from "@shared/utils/globals.util";
import { cva, VariantProps } from "class-variance-authority";

const alertVariants = cva(
  "flex-1 font-medium rounded-r-lg border-l-[5px] py-3 px-5",
  {
    variants: {
      variant: {
        success: "bg-green-300/30 text-green-800 border-green-600",
        error: "bg-red-300/30 text-red-800 border-red-600",
        warning: "bg-yellow-300/30 text-yellow-800 border-yellow-600",
        info: "bg-blue-300/30 text-blue-800 border-blue-600",
      },
    },
    defaultVariants: {
      variant: "error",
    },
  }
);

interface Props extends VariantProps<typeof alertVariants> {
  title: string;
  className?: string;
}

const AlertMessage = ({ title, className, variant }: Props) => {
  const alertClasses = alertVariants({ variant });

  return <div className={cn(alertClasses, className)}>{title}</div>;
};

export default AlertMessage;
