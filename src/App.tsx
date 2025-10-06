import { useTableStore } from "@/store/tableStore";
import { DataTable, workerColumns, taskColumns } from "@/components/DataTable";
import { FilterInput } from "@/components/FilterInput";
import { TableHeader } from "@/components/TableHeader";
import type { Worker } from "@/types";

/**
 * Главный компонент приложения
 *
 * Интегрирует все компоненты и управляет состоянием через Zustand store.
 * Поддерживает два режима отображения:
 * - Список работников (workers)
 * - Список задач выбранного работника (tasks)
 */
function App() {
  // Получаем состояние и методы из store
  const viewMode = useTableStore((state) => state.viewMode);
  const filterText = useTableStore((state) => state.filterText);
  const setFilter = useTableStore((state) => state.setFilter);
  const selectWorker = useTableStore((state) => state.selectWorker);
  const resetToWorkers = useTableStore((state) => state.resetToWorkers);
  const getFilteredWorkers = useTableStore((state) => state.getFilteredWorkers);
  const getFilteredTasks = useTableStore((state) => state.getFilteredTasks);
  const getSelectedWorker = useTableStore((state) => state.getSelectedWorker);

  // Получаем отфильтрованные данные
  const filteredWorkers = getFilteredWorkers();
  const filteredTasks = getFilteredTasks();
  const selectedWorker = getSelectedWorker();

  // Обработчик клика по работнику
  const handleWorkerClick = (worker: Worker) => {
    selectWorker(worker.id);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-7xl">
        {/* Заголовок страницы */}
        <TableHeader
          mode={viewMode}
          selectedWorker={selectedWorker}
          onBackClick={resetToWorkers}
        />

        {/* Поле фильтрации */}
        <div className="mb-6">
          <FilterInput
            value={filterText}
            onChange={setFilter}
            placeholder={
              viewMode === "workers"
                ? "Поиск работников по имени..."
                : "Поиск задач по названию..."
            }
          />
        </div>

        {/* Таблица данных */}
        {viewMode === "workers" ? (
          <DataTable
            data={filteredWorkers}
            columns={workerColumns}
            onRowClick={handleWorkerClick}
            emptyMessage="Работники не найдены"
          />
        ) : (
          <DataTable
            data={filteredTasks}
            columns={taskColumns}
            emptyMessage="Задачи не найдены"
          />
        )}
      </div>
    </div>
  );
}

export default App;
