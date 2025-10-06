import type { DataTableCellProps } from "@/types";
import { TableCell } from "@/components/ui/table";

/**
 * Компонент ячейки таблицы
 *
 * Универсальный компонент для отображения содержимого ячейки.
 * Поддерживает кастомный рендеринг через column.render
 */
export function DataTableCell<T = Record<string, unknown>>({
  value,
  column,
  row
}: DataTableCellProps<T>) {
  // Если есть кастомный рендер - используем его
  if (column.render) {
    return (
      <TableCell className={column.cellClassName}>
        {column.render(value, row)}
      </TableCell>
    );
  }

  // Иначе отображаем значение по умолчанию
  return (
    <TableCell className={column.cellClassName}>
      {value !== null && value !== undefined ? String(value) : "-"}
    </TableCell>
  );
}
