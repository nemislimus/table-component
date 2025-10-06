# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Проект

React-приложение на TypeScript, использующее Vite в качестве сборщика. Проект находится в начальной стадии разработки.

## Команды разработки

### Основные команды
- `npm run dev` - запуск dev-сервера Vite
- `npm run build` - сборка проекта (сначала компиляция TypeScript, затем сборка Vite)
- `npm run lint` - проверка кода с помощью ESLint
- `npm run preview` - предварительный просмотр production-сборки

## Архитектура

### Технологический стек
- React 19.1.1 (с React DOM)
- TypeScript 5.9.3
- Vite 7.1.7 для сборки
- ESLint 9.36.0 для линтинга

### Структура
- `src/main.tsx` - точка входа приложения, рендерит корневой компонент App в StrictMode
- `src/App.tsx` - главный компонент приложения
- `src/App.css` и `src/index.css` - стили
- `public/table_logo.svg` - статические ресурсы

### Конфигурация
- TypeScript использует project references (tsconfig.app.json и tsconfig.node.json)
- ESLint настроен с поддержкой TypeScript, React Hooks и React Refresh
- Vite использует плагин @vitejs/plugin-react

## Особенности разработки на Windows
- Проект разрабатывается на Windows
- При работе с путями учитывать специфику Windows (обратные слэши)
