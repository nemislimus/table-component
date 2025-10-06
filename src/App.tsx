import { useTableStore } from "@/store/tableStore";
import { DataTable, workerColumns, taskColumns } from "@/components/DataTable";
import { FilterInput } from "@/components/FilterInput";
import { TableHeader } from "@/components/TableHeader";
import { Pagination } from "@/components/Pagination";
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
  const currentPage = useTableStore((state) => state.currentPage);
  const setFilter = useTableStore((state) => state.setFilter);
  const setPage = useTableStore((state) => state.setPage);
  const selectWorker = useTableStore((state) => state.selectWorker);
  const resetToWorkers = useTableStore((state) => state.resetToWorkers);
  const getFilteredWorkers = useTableStore((state) => state.getFilteredWorkers);
  const getFilteredTasks = useTableStore((state) => state.getFilteredTasks);
  const getSelectedWorker = useTableStore((state) => state.getSelectedWorker);
  const getPaginatedData = useTableStore((state) => state.getPaginatedData);
  const getTotalPages = useTableStore((state) => state.getTotalPages);

  // Получаем отфильтрованные данные
  const filteredWorkers = getFilteredWorkers();
  const filteredTasks = getFilteredTasks();
  const selectedWorker = getSelectedWorker();

  // Получаем данные для текущей страницы
  const paginatedWorkers = getPaginatedData(filteredWorkers);
  const paginatedTasks = getPaginatedData(filteredTasks);

  // Получаем количество страниц
  const workersTotalPages = getTotalPages(filteredWorkers.length);
  const tasksTotalPages = getTotalPages(filteredTasks.length);

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
          <>
            <DataTable
              data={paginatedWorkers}
              columns={workerColumns}
              onRowClick={handleWorkerClick}
              emptyMessage="Работники не найдены"
            />
            <Pagination
              currentPage={currentPage}
              totalPages={workersTotalPages}
              onPageChange={setPage}
            />
          </>
        ) : (
          <>
            <DataTable
              data={paginatedTasks}
              columns={taskColumns}
              emptyMessage="Задачи не найдены"
            />
            <Pagination
              currentPage={currentPage}
              totalPages={tasksTotalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
