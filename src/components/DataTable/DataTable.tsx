import type { DataTableProps } from "@/types";
import { Table } from "@/components/ui/table";
import { DataTableHeader } from "./DataTableHeader";
import { DataTableBody } from "./DataTableBody";
import { cn } from "@/lib/utils";

/**
 * Главный компонент универсальной таблицы
 *
 * Принимает данные и конфигурацию колонок, отображает таблицу.
 * Поддерживает клик по строке и кастомные сообщения при отсутствии данных.
 *
 * @example
 * ```tsx
 * <DataTable
 *   data={workers}
 *   columns={workerColumns}
 *   onRowClick={handleWorkerClick}
 *   emptyMessage="Работники не найдены"
 * />
 * ```
 */
export function DataTable<T = Record<string, unknown>>({
  data,
  columns,
  onRowClick,
  emptyMessage = "Нет данных для отображения",
  className
}: DataTableProps<T>) {
  return (
    <div className={cn("rounded-md border", className)}>
      <Table>
        <DataTableHeader columns={columns} />
        {data.length > 0 ? (
          <DataTableBody data={data} columns={columns} onRowClick={onRowClick} />
        ) : (
          <tbody>
            <tr>
              <td
                colSpan={columns.length}
                className="h-24 text-center text-muted-foreground"
              >
                {emptyMessage}
              </td>
            </tr>
          </tbody>
        )}
      </Table>
    </div>
  );
}
