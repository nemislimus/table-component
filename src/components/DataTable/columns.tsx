import type { ColumnConfig, Worker, Task, TaskStatus, TaskPriority } from "@/types";
import { Badge } from "@/components/ui/badge";

/**
 * Получить вариант Badge для статуса задачи
 */
const getStatusVariant = (status: TaskStatus): "default" | "secondary" | "outline" => {
  switch (status) {
    case "done":
      return "default"; // Используем primary цвет (оранжевый)
    case "in_progress":
      return "secondary";
    case "review":
      return "secondary";
    case "todo":
      return "outline";
    default:
      return "outline";
  }
};

/**
 * Получить текст статуса на русском
 */
const getStatusText = (status: TaskStatus): string => {
  switch (status) {
    case "todo":
      return "К выполнению";
    case "in_progress":
      return "В работе";
    case "review":
      return "На ревью";
    case "done":
      return "Завершено";
    default:
      return status;
  }
};

/**
 * Получить вариант Badge для приоритета задачи
 */
const getPriorityVariant = (priority: TaskPriority): "default" | "secondary" | "outline" => {
  switch (priority) {
    case "urgent":
      return "default"; // Оранжевый
    case "high":
      return "secondary";
    case "medium":
      return "outline";
    case "low":
      return "outline";
    default:
      return "outline";
  }
};

/**
 * Получить текст приоритета на русском
 */
const getPriorityText = (priority: TaskPriority): string => {
  switch (priority) {
    case "low":
      return "Низкий";
    case "medium":
      return "Средний";
    case "high":
      return "Высокий";
    case "urgent":
      return "Срочно";
    default:
      return priority;
  }
};

/**
 * Конфигурация колонок для таблицы Workers
 */
export const workerColumns: ColumnConfig<Worker>[] = [
  {
    key: "id",
    header: "ID",
    width: "80px",
    cellClassName: "font-mono text-muted-foreground"
  },
  {
    key: "name",
    header: "Имя",
    cellClassName: "font-medium"
  },
  {
    key: "position",
    header: "Должность",
    cellClassName: "text-muted-foreground"
  },
  {
    key: "email",
    header: "Email",
    cellClassName: "font-mono text-sm"
  },
  {
    key: "tasksCount",
    header: "Задач",
    width: "100px",
    render: (value) => (
      <Badge variant="secondary" className="font-semibold">
        {String(value)}
      </Badge>
    )
  }
];

/**
 * Конфигурация колонок для таблицы Tasks
 */
export const taskColumns: ColumnConfig<Task>[] = [
  {
    key: "id",
    header: "ID",
    width: "120px",
    cellClassName: "font-mono text-muted-foreground text-sm"
  },
  {
    key: "title",
    header: "Название",
    cellClassName: "font-medium"
  },
  {
    key: "status",
    header: "Статус",
    width: "140px",
    render: (value) => {
      const status = value as TaskStatus;
      return (
        <Badge variant={getStatusVariant(status)}>
          {getStatusText(status)}
        </Badge>
      );
    }
  },
  {
    key: "priority",
    header: "Приоритет",
    width: "120px",
    render: (value) => {
      const priority = value as TaskPriority;
      return (
        <Badge variant={getPriorityVariant(priority)}>
          {getPriorityText(priority)}
        </Badge>
      );
    }
  }
];
