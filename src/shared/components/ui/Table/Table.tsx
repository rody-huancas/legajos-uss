import { IColumn } from "@shared/models/global.model";

interface TableProps<T> {
  columns: IColumn<T>[];
  data: T[];
}

const Table = <T extends {}>({ columns, data }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={column.key ? column.key.toString() : `column-${index}`}
                className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b whitespace-nowrap"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          { data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-3 py-2 text-xs text-gray-700 border-b whitespace-nowrap text-center">
                No hay registros
              </td>
            </tr>
          )}
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((column, colIndex) => (
                <td
                  key={column.key ? column.key.toString() : `cell-${rowIndex}-${colIndex}`}
                  className="px-3 py-2 text-xs text-gray-700 border-b whitespace-nowrap"
                >
                  {column.cell
                    ? column.cell()
                    : column.render
                    ? column.render(row)
                    : (row[column.key as keyof T] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;