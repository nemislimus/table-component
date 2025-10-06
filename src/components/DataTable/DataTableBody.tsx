import type { DataTableBodyProps } from "@/types";
import { TableBody } from "@/components/ui/table";
import { DataTableRow } from "./DataTableRow";

/**
 * Компонент тела таблицы
 *
 * Отображает строки данных, передавая обработчики событий
 */
export function DataTableBody<T = Record<string, unknown>>({
  data,
  columns,
  onRowClick
}: DataTableBodyProps<T>) {
  return (
    <TableBody>
      {data.map((row, index) => (
        <DataTableRow
          key={index}
          row={row}
          columns={columns}
          onClick={onRowClick}
        />
      ))}
    </TableBody>
  );
}
