import { useState } from "react";
/* Libraries */
import { es } from "date-fns/locale";
import { Control } from "react-hook-form";
import { registerLocale } from "react-datepicker";
/* Components */
import { DatePickerField } from "./DatePickerField";
/* Icons */
import { RiLoaderLine } from "react-icons/ri";

registerLocale("es", es);

interface InputDatePickerProps {
  name         : string;
  control      : Control<any>;
  label       ?: string;
  errorMessage?: string;
  isLoading   ?: boolean;
  placeholder ?: string;
  required    ?: boolean;
  disabled    ?: boolean;
  dateFormat  ?: string;
  value       ?: string | undefined;
}

const InputDatePicker = (props: InputDatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { name, control, label, errorMessage, isLoading = false, placeholder = "Selecciona una fecha", disabled = false, dateFormat = "dd/MM/yyyy", value } = props;

  return (
    <div className="relative flex flex-col w-full flex-1">
      {label && (
        <label htmlFor={name} className="mb-1 text-sm font-medium leading-5 text-secondary-800/95">
          {label}
        </label>
      )}

      {isLoading ? (
        <RiLoaderLine className="animate-spin text-secondary-800" size={18} />
      ) : (
        <DatePickerField
          name         = {name}
          control      = {control}
          disabled     = {disabled}
          placeholder  = {placeholder}
          dateFormat   = {dateFormat}
          errorMessage = {errorMessage}
          isOpen       = {isOpen}
          setIsOpen    = {setIsOpen}
          value        = {value}
        />
      )}

      {errorMessage && (
        <span className="mt-1 text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};

export default InputDatePicker;