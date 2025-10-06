import type { DataTableHeaderProps } from "@/types";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

/**
 * Компонент заголовка таблицы
 *
 * Отображает заголовки колонок на основе конфигурации
 */
export function DataTableHeader<T = Record<string, unknown>>({
  columns
}: DataTableHeaderProps<T>) {
  return (
    <TableHeader>
      <TableRow>
        {columns.map((column) => (
          <TableHead
            key={column.key}
            className={column.headerClassName}
            style={{ width: column.width }}
          >
            {column.header}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
