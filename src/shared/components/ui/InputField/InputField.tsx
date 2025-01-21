import { cn } from "@shared/utils/globals.util";
import { FieldError, UseFormRegister } from "react-hook-form";
/* Icons */
import { CiCircleAlert } from "react-icons/ci";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label          : string;
  icon         ? : React.ReactNode;
  name           : string;
  register       : UseFormRegister<any> | undefined;
  error        ? : FieldError | undefined;
  valueAsNumber? : boolean;
  classContainer?: string;
}

const InputField: React.FC<InputProps> = (props) => {
  const { label, className, icon, type = "text", error, register, name, valueAsNumber, classContainer, ...args } = props;

  return (
    <div className={cn("relative flex flex-col w-full flex-1", classContainer)}>
      {/* Label */}
      <label htmlFor={name} className={cn("mb-1 text-sm font-medium leading-5 text-secondary-800/95")}>
        {label}
      </label>

      {/* Input Field */}
      <div className="relative flex items-center">
        <input
          type={type}
          name={name}
          id={name}
          className={cn(
            "w-full overflow-hidden text-ellipsis rounded border border-gray-800/20 bg-white py-3 pl-3.5 pr-8 text-sm font-normal leading-5 text-secondary-800",
            "outline-none transition duration-200 ease-in-out placeholder:text-secondary-800/50 focus:border-secondary-800 focus:ring-sec8border-secondary-800 focus:ring-offset-0",
            "disabled:cursor-not-allowed disabled:border-secondary-800 disabled:text-secondary-800/60",
            "dark:bg-gray-100/10 dark:text-secondary-800 dark:border-secondary-800/50 dark:placeholder-secondary-800 dark:focus:border-secondary-800/90",
            icon && "pl-10",
            error && "border-red-500 focus:border-red-500",
            className
          )}
          {...(register && register(name, { valueAsNumber }))}
          {...args}
        />

        {/* Left Icon */}
        {icon && (
          <div className="absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2">
            {icon}
          </div>
        )}

        {/* Error Icon */}
        {error && (
          <CiCircleAlert
            size={16}
            className={cn(
              "absolute right-3.5 top-1/2 -translate-y-1/2 text-secondary-800",
              error && "text-red-500"
            )}
          />
        )}
      </div>

      {/* Error Message */}
      {error && (
        <span className="mt-1 text-xs text-red-500">{error.message}</span>
      )}
    </div>
  );
};

export default InputField;
