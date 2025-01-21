import { es } from "date-fns/locale";
import { format } from "date-fns";
/* Utils */
import { cn } from "@shared/utils/globals.util";
/* Icons */
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

interface CustomHeaderProps {
  date                   : Date;
  decreaseMonth          : () => void;
  increaseMonth          : () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
  changeYear             : (year: number) => void;
  changeMonth            : (month: number) => void;
}

export const DatePickerCustomHeader = (props: CustomHeaderProps) => {
  const { date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled, changeYear, changeMonth } = props;

  const months = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  const years = Array.from({ length: 111 }, (_, i) => date.getFullYear() - 100 + i);

  return (
    <div className="px-2 rounded-xl z-20">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          type="button"
          className={cn("p-1 hover:bg-gray-100 hover:text-secondary-800 rounded-full",
            prevMonthButtonDisabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <GrFormPrevious size={20} />
        </button>
        <div 
          className="text-sm font-bold capitalize cursor-pointer hover:bg-secondary-100 hover:text-secondary-800 px-2 py-1 rounded"
          onClick={() => document.getElementById('month-year-select')?.classList.toggle('hidden')}
        >
          {format(date, "MMMM yyyy", { locale: es })}
        </div>
        <button
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          type="button"
          className={cn("p-1 hover:bg-secondary-100 hover:text-secondary-800 rounded-full",
            nextMonthButtonDisabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <GrFormNext size={20} />
        </button>
      </div>

      <div id="month-year-select" className="hidden">
        <div className="grid grid-cols-3 gap-1 mb-2">
          {months.map((month, index) => (
            <button
              type="button"
              key={month}
              onClick={() => {
                changeMonth(index);
                document.getElementById('month-year-select')?.classList.add('hidden');
              }}
              className={cn("text-sm text-start py-1 px-2 rounded hover:bg-secondary-100 hover:text-secondary-800",
                date.getMonth() === index && "bg-secondary-100 text-secondary-800 font-bold"
              )}
            >
              {month}
            </button>
          ))}
        </div>

        <hr className="text-secondary-100 py-1" />

        <div className="grid grid-cols-4 gap-1 pb-5 h-52 overflow-y-scroll">
          {years.map((year) => (
            <button
              type="button"
              key={year}
              onClick={() => {
                changeYear(year);
                document.getElementById('month-year-select')?.classList.add('hidden');
              }}
              className={cn("text-sm py-1 px-2 rounded hover:bg-secondary-100 hover:text-secondary-800",
                date.getFullYear() === year && "bg-secondary-100 text-secondary-800 font-bold"
              )}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};