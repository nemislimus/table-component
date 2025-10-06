import type { ReactNode } from "react";

/**
 * Константа размера страницы для пагинации
 */
export const PAGE_SIZE = 15;

/**
 * Модель работника (Worker)
 * Содержит информацию о сотруднике и количестве его задач
 */
export interface Worker {
  id: string;
  name: string;
  position: string;
  email: string;
  tasksCount: number;
}

/**
 * Модель задачи (Task)
 * Содержит информацию о задаче, привязанной к конкретному работнику
 */
export interface Task {
  id: string;
  workerId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
}

/**
 * Статусы задачи
 */
export type TaskStatus = "todo" | "in_progress" | "review" | "done";

/**
 * Приоритеты задачи
 */
export type TaskPriority = "low" | "medium" | "high" | "urgent";

/**
 * Режим отображения таблицы
 */
export type ViewMode = "workers" | "tasks";

/**
 * Конфигурация колонки таблицы
 * T - тип данных строки таблицы
 */
export interface ColumnConfig<T = Record<string, unknown>> {
  /** Ключ поля в данных */
  key: string;
  /** Заголовок колонки */
  header: string;
  /** Кастомный рендер ячейки (опционально) */
  render?: (value: unknown, row: T) => ReactNode;
  /** CSS классы для ячейки */
  cellClassName?: string;
  /** CSS классы для заголовка */
  headerClassName?: string;
  /** Ширина колонки */
  width?: string;
}

/**
 * Props для компонента DataTable
 */
export interface DataTableProps<T = Record<string, unknown>> {
  data: T[];
  columns: ColumnConfig<T>[];
  onRowClick?: (row: T) => void;
  emptyMessage?: string;
  className?: string;
}

/**
 * Props для компонента DataTableHeader
 */
export interface DataTableHeaderProps<T = Record<string, unknown>> {
  columns: ColumnConfig<T>[];
}

/**
 * Props для компонента DataTableBody
 */
export interface DataTableBodyProps<T = Record<string, unknown>> {
  data: T[];
  columns: ColumnConfig<T>[];
  onRowClick?: (row: T) => void;
}

/**
 * Props для компонента DataTableRow
 */
export interface DataTableRowProps<T = Record<string, unknown>> {
  row: T;
  columns: ColumnConfig<T>[];
  onClick?: (row: T) => void;
}

/**
 * Props для компонента DataTableCell
 */
export interface DataTableCellProps<T = Record<string, unknown>> {
  value: unknown;
  column: ColumnConfig<T>;
  row: T;
}
