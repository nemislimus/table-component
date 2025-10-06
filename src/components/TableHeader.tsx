import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import type { Worker } from "@/types";

/**
 * Props для компонента TableHeader
 */
interface TableHeaderProps {
  mode: "workers" | "tasks";
  selectedWorker?: Worker | null;
  onBackClick?: () => void;
}

/**
 * Компонент заголовка страницы с таблицей
 *
 * Отображает:
 * - В режиме workers: заголовок "Работники"
 * - В режиме tasks: кнопку "Назад" и информацию о выбранном работнике
 */
export function TableHeader({ mode, selectedWorker, onBackClick }: TableHeaderProps) {
  if (mode === "workers") {
    return (
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Работники</h1>
          <p className="text-muted-foreground mt-1">
            Список всех работников компании
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={onBackClick}
          className="shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Задачи работника
          </h1>
          {selectedWorker && (
            <p className="text-muted-foreground mt-1">
              {selectedWorker.name} • {selectedWorker.position}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
