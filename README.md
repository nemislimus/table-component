# Table Component

Тестовое задание: универсальный компонент таблицы на React + TypeScript

## 🚀 Демо

**https://nemislimus.github.io/table-component/**

## 📋 Описание

Приложение для управления списком работников и их задачами с возможностью фильтрации и навигации.

### Функционал
- Просмотр списка работников (30 записей)
- Просмотр задач выбранного работника (4-8 задач на работника)
- Поиск по имени/названию в реальном времени
- Пагинация (15 элементов на страницу)
- Адаптивный дизайн с тёмной темой

### Технологии
- **React 19** + **TypeScript**
- **Vite** - сборка проекта
- **Zustand** - управление состоянием
- **Shadcn UI** + **Tailwind CSS v4** - UI компоненты
- **Vitest** + **Testing Library** - тестирование (35 тестов)
- **GitHub Actions** - автоматический деплой на GitHub Pages

## 🛠️ Установка и запуск

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Запуск тестов
npm run test

# Сборка проекта
npm run build

# Предварительный просмотр сборки
npm run preview
```

## 🏗️ Архитектура

### Универсальные компоненты таблицы
```
DataTable (универсальный, работает с любыми данными)
  ├── DataTableHeader
  ├── DataTableBody
  │   └── DataTableRow
  │       └── DataTableCell
```

### Структура проекта
```
src/
├── components/
│   ├── DataTable/         # Универсальные компоненты таблицы
│   │   ├── DataTable.tsx
│   │   ├── DataTableRow.tsx
│   │   ├── DataTableCell.tsx
│   │   ├── columns.tsx    # Конфигурация колонок
│   │   └── *.test.tsx
│   ├── ui/                # Shadcn UI компоненты
│   ├── FilterInput.tsx    # Поиск
│   ├── Pagination.tsx     # Пагинация
│   └── TableHeader.tsx    # Шапка таблицы
├── store/
│   └── tableStore.ts      # Zustand store + тесты
├── data/
│   └── mockData.ts        # Генерация тестовых данных
└── types/
    └── index.ts           # TypeScript типы
```

## ✅ Тестирование

Покрытие тестами: **35 тестов**
- `tableStore.test.ts` - 23 теста (фильтрация, навигация, пагинация)
- `DataTable.test.tsx` - 6 тестов (рендеринг, пустое состояние)
- `FilterInput.test.tsx` - 6 тестов (поиск, очистка)

```bash
npm run test      # Запуск в watch режиме
npm run test:run  # Одиночный запуск
```

## 📦 Деплой

Автоматический деплой на GitHub Pages при push в `main`:
- Запуск тестов
- Сборка проекта
- Публикация на https://nemislimus.github.io/table-component/

---

**Автор:** [nemislimus](https://github.com/nemislimus)
**Лицензия:** MIT
