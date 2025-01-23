import { cn } from "@shared/utils/globals.util";
import { VariantProps, cva } from "class-variance-authority";

const titleVariants = cva(
  "font-bold leading-tight tracking-tight",
  {
    variants: {
      size: {
        xs: "text-xs md:text-base",
        sm: "text-xl md:text-2xl",
        md: "text-2xl md:text-3xl",
        lg: "text-3xl md:text-4xl",
        xl: "text-4xl md:text-5xl",
      },
      variant: {
        default  : "text-gray-900/90 dark:text-gray-100",
        primary  : "text-blue-600 dark:text-blue-400",
        secondary: "text-purple-600 dark:text-purple-400",
        success  : "text-green-600 dark:text-green-400",
        warning  : "text-yellow-600 dark:text-yellow-400",
        danger   : "text-red-600 dark:text-red-400",
      },
      align: {
        left  : "text-left",
        center: "text-center",
        right : "text-right",
      },
      weight: {
        normal  : "font-normal",
        medium  : "font-medium",
        semibold: "font-semibold",
        bold    : "font-bold",
      },
      transform: {
        none      : "",
        uppercase : "uppercase",
        lowercase : "lowercase",
        capitalize: "capitalize",
      },
    },
    defaultVariants: {
      size     : "md",
      variant  : "default",
      align    : "left",
      weight   : "bold",
      transform: "none",
    },
  }
);

type TitleElement = Extract<
  keyof JSX.IntrinsicElements,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
>;

interface TitleProps extends Omit<React.HTMLAttributes<HTMLHeadingElement>, "color">, VariantProps<typeof titleVariants> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Title = (args: TitleProps) => {
  const { className, level = 1, size, variant, align, weight, transform, children, ...props } = args
  const Component = `h${level}` as TitleElement;

  return (
    <Component
      className={cn(
        titleVariants({ size, variant, align, weight, transform }),
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export { Title, titleVariants };
export type { TitleProps };
