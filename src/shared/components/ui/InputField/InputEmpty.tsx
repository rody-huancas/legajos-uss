import { cn } from "@shared/utils/globals.util";

export interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label : string;
  icon ?: React.ReactNode;
}

const InputEmpty = (props: Props) => {
  const { label, className, icon, type = "text", name, ...args } = props;

  return (
    <div className="relative flex flex-col">
      <label htmlFor={name} className={cn("mb-1 text-sm font-medium leading-5 text-secondary-800/95")}>
        {label}
      </label>

      <div className="relative flex items-center">
        <input
          type={type}
          name={name}
          id={name}
          className={cn(
            "w-full overflow-hidden text-ellipsis rounded border border-gray-800/20 bg-white py-3 pl-3.5 pr-8 text-sm font-normal leading-5 text-secondary-800",
            "outline-none transition duration-200 ease-in-out placeholder:text-secondary-800/50 focus:border-secondary-800 focus:ring-sec8border-secondary-800 focus:ring-offset-0",
            "disabled:cursor-not-allowed disabled:border-secondary-800/20 disabled:text-secondary-800/60",
            "dark:bg-gray-100/10 dark:text-secondary-800 dark:border-secondary-800/50 dark:placeholder-secondary-800 dark:focus:border-secondary-800/90",
            icon && "pl-10",
            className
          )}
          {...args}
        />

        {icon && (
          <div className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default InputEmpty;
