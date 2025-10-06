import type { Worker, Task, TaskStatus, TaskPriority } from "@/types";

/**
 * Генератор уникальных ID
 */
const generateId = (prefix: string, index: number): string =>
  `${prefix}-${String(index).padStart(3, '0')}`;

/**
 * Массивы данных для генерации
 */
const firstNames = [
  "Алексей", "Мария", "Дмитрий", "Анна", "Сергей", "Елена",
  "Иван", "Ольга", "Андрей", "Наталья", "Максим", "Татьяна",
  "Владимир", "Екатерина", "Николай", "Светлана", "Павел", "Ирина",
  "Роман", "Юлия", "Артём", "Виктория", "Денис", "Марина",
  "Егор", "Дарья", "Антон", "Кристина", "Илья", "Александра"
];

const lastNames = [
  "Иванов", "Петров", "Сидоров", "Смирнов", "Кузнецов", "Попов",
  "Васильев", "Соколов", "Михайлов", "Новиков", "Федоров", "Морозов",
  "Волков", "Алексеев", "Лебедев", "Семёнов", "Егоров", "Павлов",
  "Козлов", "Степанов", "Николаев", "Орлов", "Андреев", "Макаров",
  "Никитин", "Захаров", "Зайцев", "Соловьёв", "Борисов", "Яковлев"
];

const positions = [
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "DevOps Engineer",
  "QA Engineer",
  "UI/UX Designer",
  "Product Manager",
  "Project Manager",
  "Team Lead",
  "Tech Lead"
];

const taskTitles = [
  "Реализовать авторизацию пользователя",
  "Оптимизировать загрузку страницы",
  "Исправить баг с отображением данных",
  "Добавить валидацию форм",
  "Настроить CI/CD pipeline",
  "Написать документацию API",
  "Провести code review",
  "Обновить зависимости проекта",
  "Реализовать систему уведомлений",
  "Оптимизировать SQL запросы",
  "Добавить тесты для компонента",
  "Исправить проблему с кешированием",
  "Реализовать responsive дизайн",
  "Настроить мониторинг системы",
  "Провести рефакторинг кода",
  "Интегрировать сторонний API",
  "Исправить уязвимость безопасности",
  "Оптимизировать работу базы данных",
  "Добавить поддержку темной темы",
  "Настроить автоматическое тестирование"
];

const statuses: TaskStatus[] = ["todo", "in_progress", "review", "done"];
const priorities: TaskPriority[] = ["low", "medium", "high", "urgent"];

/**
 * Получить случайный элемент из массива
 */
const getRandomItem = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

/**
 * Получить случайное число в диапазоне
 */
const getRandomNumber = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Генерация массива работников
 * Создаёт 30 работников с уникальными данными
 */
const generateWorkers = (): Worker[] => {
  const workers: Worker[] = [];

  for (let i = 1; i <= 30; i++) {
    const firstName = firstNames[i - 1];
    const lastName = lastNames[i - 1];
    const tasksCount = getRandomNumber(4, 8);

    workers.push({
      id: generateId("W", i),
      name: `${firstName} ${lastName}`,
      position: getRandomItem(positions),
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      tasksCount
    });
  }

  return workers;
};

/**
 * Генерация задач для конкретного работника
 */
const generateTasksForWorker = (worker: Worker): Task[] => {
  const tasks: Task[] = [];
  const usedTitles = new Set<string>();

  for (let i = 1; i <= worker.tasksCount; i++) {
    // Выбираем уникальное название задачи для работника
    let title: string;
    do {
      title = getRandomItem(taskTitles);
    } while (usedTitles.has(title));
    usedTitles.add(title);

    tasks.push({
      id: generateId(`${worker.id}-T`, i),
      workerId: worker.id,
      title,
      description: `Детальное описание задачи: ${title.toLowerCase()}`,
      status: getRandomItem(statuses),
      priority: getRandomItem(priorities)
    });
  }

  return tasks;
};

/**
 * Генерация всех задач для всех работников
 */
const generateAllTasks = (workers: Worker[]): Task[] => {
  const allTasks: Task[] = [];

  workers.forEach(worker => {
    const workerTasks = generateTasksForWorker(worker);
    allTasks.push(...workerTasks);
  });

  return allTasks;
};

/**
 * Mock данные: 30 работников
 */
export const mockWorkers: Worker[] = generateWorkers();

/**
 * Mock данные: все задачи для всех работников (180-240 задач)
 */
export const mockTasks: Task[] = generateAllTasks(mockWorkers);

/**
 * Получить задачи конкретного работника
 */
export const getTasksByWorkerId = (workerId: string): Task[] => {
  return mockTasks.filter(task => task.workerId === workerId);
};

/**
 * Получить работника по ID
 */
export const getWorkerById = (workerId: string): Worker | undefined => {
  return mockWorkers.find(worker => worker.id === workerId);
};
