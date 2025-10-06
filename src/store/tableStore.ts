import { create } from "zustand";
import type { Worker, Task, ViewMode } from "@/types";
import { PAGE_SIZE } from "@/types";
import { mockWorkers, getTasksByWorkerId } from "@/data/mockData";

/**
 * Интерфейс состояния store
 */
interface TableState {
  // Состояние
  viewMode: ViewMode;
  selectedWorkerId: string | null;
  filterText: string;
  currentPage: number;

  // Геттеры
  getFilteredWorkers: () => Worker[];
  getFilteredTasks: () => Task[];
  getSelectedWorker: () => Worker | null;
  getPaginatedData: <T>(data: T[]) => T[];
  getTotalPages: (totalItems: number) => number;

  // Методы для управления состоянием
  setViewMode: (mode: ViewMode) => void;
  selectWorker: (workerId: string) => void;
  setFilter: (text: string) => void;
  setPage: (page: number) => void;
  resetToWorkers: () => void;
}

/**
 * Zustand store для управления состоянием таблицы
 *
 * Управляет:
 * - Режимом отображения (workers/tasks)
 * - Выбранным работником
 * - Фильтрацией данных
 */
export const useTableStore = create<TableState>((set, get) => ({
  // Начальное состояние
  viewMode: "workers",
  selectedWorkerId: null,
  filterText: "",
  currentPage: 1,

  /**
   * Получить отфильтрованный список работников
   * Фильтрация происходит по имени работника (регистронезависимая)
   */
  getFilteredWorkers: () => {
    const { filterText } = get();

    if (!filterText.trim()) {
      return mockWorkers;
    }

    const lowerFilter = filterText.toLowerCase();
    return mockWorkers.filter(worker =>
      worker.name.toLowerCase().includes(lowerFilter)
    );
  },

  /**
   * Получить отфильтрованный список задач выбранного работника
   * Фильтрация происходит по названию задачи (регистронезависимая)
   */
  getFilteredTasks: () => {
    const { selectedWorkerId, filterText } = get();

    if (!selectedWorkerId) {
      return [];
    }

    const workerTasks = getTasksByWorkerId(selectedWorkerId);

    if (!filterText.trim()) {
      return workerTasks;
    }

    const lowerFilter = filterText.toLowerCase();
    return workerTasks.filter(task =>
      task.title.toLowerCase().includes(lowerFilter)
    );
  },

  /**
   * Получить выбранного работника
   */
  getSelectedWorker: () => {
    const { selectedWorkerId } = get();

    if (!selectedWorkerId) {
      return null;
    }

    return mockWorkers.find(worker => worker.id === selectedWorkerId) || null;
  },

  /**
   * Установить режим отображения
   */
  setViewMode: (mode: ViewMode) => {
    set({ viewMode: mode });
  },

  /**
   * Выбрать работника и переключиться на режим задач
   * При выборе работника сбрасывается фильтр и страница
   */
  selectWorker: (workerId: string) => {
    set({
      selectedWorkerId: workerId,
      viewMode: "tasks",
      filterText: "", // Сбрасываем фильтр при переходе к задачам
      currentPage: 1  // Сбрасываем на первую страницу
    });
  },

  /**
   * Получить данные для текущей страницы
   */
  getPaginatedData: <T>(data: T[]) => {
    const { currentPage } = get();
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    return data.slice(startIndex, endIndex);
  },

  /**
   * Получить общее количество страниц
   */
  getTotalPages: (totalItems: number) => {
    return Math.ceil(totalItems / PAGE_SIZE);
  },

  /**
   * Установить текст фильтра
   * Фильтр работает в реальном времени
   * При изменении фильтра сбрасываем на первую страницу
   */
  setFilter: (text: string) => {
    set({ filterText: text, currentPage: 1 });
  },

  /**
   * Установить номер текущей страницы
   */
  setPage: (page: number) => {
    set({ currentPage: page });
  },

  /**
   * Сброс к списку работников
   * Сбрасывает выбранного работника, фильтр и страницу
   */
  resetToWorkers: () => {
    set({
      viewMode: "workers",
      selectedWorkerId: null,
      filterText: "",
      currentPage: 1
    });
  }
}));
