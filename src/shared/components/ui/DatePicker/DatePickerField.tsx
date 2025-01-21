import DatePicker from "react-datepicker";
import { Control, Controller } from "react-hook-form";
/* Utils */
import { cn } from "@shared/utils/globals.util";
/* Components */
import { DatePickerCustomHeader } from "./DatePickerCustomHeader";
/* Icons */
import { CiCircleAlert } from "react-icons/ci";
/* Styles */
import "react-datepicker/dist/react-datepicker.css";
import "./date-picker.css";

interface DatePickerFieldProps {
  name         : string;
  control      : Control<any>;
  disabled    ?: boolean;
  placeholder ?: string;
  dateFormat  ?: string;
  errorMessage?: string;
  isOpen       : boolean;
  setIsOpen    : (isOpen: boolean) => void;
}

export const DatePickerField = (props: DatePickerFieldProps) => {
  const { name, control, disabled = false, placeholder, dateFormat = "dd/MM/yyyy", errorMessage, isOpen, setIsOpen } = props;

  return (
    <div className="relative w-full">
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            selected={value}
            onChange={onChange}
            locale="es"
            dateFormat={dateFormat}
            disabled={disabled}
            placeholderText={placeholder}
            isClearable
            open={isOpen}
            showMonthYearPicker={false}
            onClickOutside={() => {
              setIsOpen(false);
              document.getElementById('month-year-select')?.classList.add('hidden');
            }}
            onInputClick={() => setIsOpen(true)}
            className={cn(
              "w-full flex-1 rounded border p-3 text-sm font-normal leading-5 text-secondary-800",
              "placeholder:text-secondary-800/50 outline-none transition duration-200 ease-in-out",
              "focus:border-secondary-800 focus:ring-1 focus:ring-secondary-800",
              "disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-100",
              errorMessage ? "border-red-500 focus:ring-red-500" : "border-gray-300"
            )}
            renderCustomHeader={DatePickerCustomHeader}
            calendarClassName="border border-gray-200 rounded-lg shadow-lg"
            showPopperArrow={false}
            popperClassName="z-50"
            popperPlacement="bottom-start"
          />
        )}
      />
      {errorMessage && (
        <CiCircleAlert
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500"
        />
      )}
    </div>
  );
};