import type { DataTableRowProps } from "@/types";
import { TableRow } from "@/components/ui/table";
import { DataTableCell } from "./DataTableCell";

/**
 * Компонент строки таблицы
 *
 * Универсальный компонент для отображения строки данных.
 * Поддерживает клик по строке и hover-эффекты
 */
export function DataTableRow<T = Record<string, unknown>>({
  row,
  columns,
  onClick
}: DataTableRowProps<T>) {
  const handleClick = () => {
    if (onClick) {
      onClick(row);
    }
  };

  return (
    <TableRow
      onClick={handleClick}
      className={onClick ? "cursor-pointer hover:bg-accent/50 transition-colors" : ""}
    >
      {columns.map((column) => {
        const value = (row as Record<string, unknown>)[column.key];
        return (
          <DataTableCell
            key={column.key}
            value={value}
            column={column}
            row={row}
          />
        );
      })}
    </TableRow>
  );
}
