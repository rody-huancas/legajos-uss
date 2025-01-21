import Select, { Props as ReactSelectProps } from "react-select";
import { Control, Controller } from "react-hook-form";
import { RiLoaderLine } from "react-icons/ri";

interface SelectProps extends ReactSelectProps {
  name         : string;
  control      : Control<any>;
  errorMessage?: string;
  clean       ?: boolean;
  label       ?: string; 
  isLoading   ?: boolean;
}

const ReactSelect: React.FC<SelectProps> = (props) => {
  const { name, control, errorMessage, clean = true, label, isLoading = false, ...selectProps } = props;

  return (
    <div className="relative flex flex-col w-full flex-1">
      {
        label && (
          <label htmlFor={name} className="mb-1 text-sm font-medium leading-5 text-secondary-800/95">
            {label}
          </label>
        )
      }
      {
        isLoading ? (
          <RiLoaderLine className="animate-spin" size={18} />
        ) : (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-1">
                <Select
                  {...field}
                  {...selectProps}
                  isClearable={clean}
                  onChange={(selectedOption) => field.onChange(selectedOption || undefined)}
                  className="w-full placeholder:text-gray-900"
                  noOptionsMessage={() => <span className="text-sm">No hay opciones disponibles</span>}
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                  classNamePrefix={errorMessage && "error-select"}
                />
                {errorMessage && (
                   <span className="mt-1 text-xs text-red-500">{errorMessage}</span>
                )}
              </div>
            )}
          />
        )
      }
    </div>
  );
};

export default ReactSelect;
