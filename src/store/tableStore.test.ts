import { describe, it, expect, beforeEach } from 'vitest'
import { useTableStore } from './tableStore'
import { mockWorkers } from '@/data/mockData'
import { PAGE_SIZE } from '@/types'

describe('tableStore', () => {
  // Сброс store перед каждым тестом
  beforeEach(() => {
    useTableStore.setState({
      viewMode: 'workers',
      selectedWorkerId: null,
      filterText: '',
      currentPage: 1
    })
  })

  describe('Начальное состояние', () => {
    it('должен иметь правильное начальное состояние', () => {
      const state = useTableStore.getState()

      expect(state.viewMode).toBe('workers')
      expect(state.selectedWorkerId).toBeNull()
      expect(state.filterText).toBe('')
      expect(state.currentPage).toBe(1)
    })
  })

  describe('setViewMode', () => {
    it('должен переключать режим отображения', () => {
      const { setViewMode } = useTableStore.getState()

      setViewMode('tasks')
      expect(useTableStore.getState().viewMode).toBe('tasks')

      setViewMode('workers')
      expect(useTableStore.getState().viewMode).toBe('workers')
    })
  })

  describe('selectWorker', () => {
    it('должен выбирать работника и переключаться на режим задач', () => {
      const { selectWorker } = useTableStore.getState()
      const testWorkerId = 'W-001'

      selectWorker(testWorkerId)

      const state = useTableStore.getState()
      expect(state.selectedWorkerId).toBe(testWorkerId)
      expect(state.viewMode).toBe('tasks')
      expect(state.filterText).toBe('') // Фильтр должен сброситься
    })

    it('должен сбрасывать фильтр при выборе работника', () => {
      const { setFilter, selectWorker } = useTableStore.getState()

      setFilter('test filter')
      selectWorker('W-001')

      expect(useTableStore.getState().filterText).toBe('')
    })
  })

  describe('setFilter', () => {
    it('должен устанавливать текст фильтра', () => {
      const { setFilter } = useTableStore.getState()
      const filterText = 'Иван'

      setFilter(filterText)

      expect(useTableStore.getState().filterText).toBe(filterText)
    })
  })

  describe('resetToWorkers', () => {
    it('должен сбрасывать к списку работников', () => {
      const { selectWorker, setFilter, resetToWorkers } = useTableStore.getState()

      // Устанавливаем состояние
      selectWorker('W-001')
      setFilter('test')

      // Сбрасываем
      resetToWorkers()

      const state = useTableStore.getState()
      expect(state.viewMode).toBe('workers')
      expect(state.selectedWorkerId).toBeNull()
      expect(state.filterText).toBe('')
    })
  })

  describe('getFilteredWorkers', () => {
    it('должен возвращать всех работников без фильтра', () => {
      const { getFilteredWorkers } = useTableStore.getState()

      const workers = getFilteredWorkers()

      expect(workers).toHaveLength(mockWorkers.length)
    })

    it('должен фильтровать работников по имени', () => {
      const { setFilter, getFilteredWorkers } = useTableStore.getState()

      // Ищем работников с именем "Иван" (первое имя в нашем списке)
      setFilter('Алексей')
      const filteredWorkers = getFilteredWorkers()

      expect(filteredWorkers.length).toBeGreaterThan(0)
      filteredWorkers.forEach(worker => {
        expect(worker.name.toLowerCase()).toContain('алексей')
      })
    })

    it('должен быть регистронезависимым', () => {
      const { setFilter, getFilteredWorkers } = useTableStore.getState()

      setFilter('ИВАНОВ')
      const filtered1 = getFilteredWorkers()

      setFilter('иванов')
      const filtered2 = getFilteredWorkers()

      expect(filtered1).toEqual(filtered2)
    })

    it('должен возвращать пустой массив если ничего не найдено', () => {
      const { setFilter, getFilteredWorkers } = useTableStore.getState()

      setFilter('NonExistentName12345')
      const filteredWorkers = getFilteredWorkers()

      expect(filteredWorkers).toHaveLength(0)
    })
  })

  describe('getFilteredTasks', () => {
    it('должен возвращать пустой массив если работник не выбран', () => {
      const { getFilteredTasks } = useTableStore.getState()

      const tasks = getFilteredTasks()

      expect(tasks).toHaveLength(0)
    })

    it('должен возвращать все задачи выбранного работника без фильтра', () => {
      const { selectWorker, getFilteredTasks } = useTableStore.getState()

      const worker = mockWorkers[0]
      selectWorker(worker.id)

      const tasks = getFilteredTasks()

      expect(tasks).toHaveLength(worker.tasksCount)
      tasks.forEach(task => {
        expect(task.workerId).toBe(worker.id)
      })
    })

    it('должен фильтровать задачи по названию', () => {
      const { selectWorker, setFilter, getFilteredTasks } = useTableStore.getState()

      selectWorker(mockWorkers[0].id)
      setFilter('авторизац')

      const filteredTasks = getFilteredTasks()

      // Должны найти только задачи с "авторизац" в названии
      filteredTasks.forEach(task => {
        expect(task.title.toLowerCase()).toContain('авторизац')
      })
    })
  })

  describe('getSelectedWorker', () => {
    it('должен возвращать null если работник не выбран', () => {
      const { getSelectedWorker } = useTableStore.getState()

      const worker = getSelectedWorker()

      expect(worker).toBeNull()
    })

    it('должен возвращать выбранного работника', () => {
      const { selectWorker, getSelectedWorker } = useTableStore.getState()

      const testWorker = mockWorkers[0]
      selectWorker(testWorker.id)

      const selectedWorker = getSelectedWorker()

      expect(selectedWorker).toEqual(testWorker)
    })
  })

  describe('Пагинация', () => {
    describe('getPaginatedData', () => {
      it('должен возвращать первую страницу данных', () => {
        const { getPaginatedData } = useTableStore.getState()
        const testData = Array.from({ length: 30 }, (_, i) => ({ id: i }))

        const page1 = getPaginatedData(testData)

        expect(page1).toHaveLength(PAGE_SIZE)
        expect(page1[0].id).toBe(0)
        expect(page1[PAGE_SIZE - 1].id).toBe(PAGE_SIZE - 1)
      })

      it('должен возвращать вторую страницу данных', () => {
        const { setPage, getPaginatedData } = useTableStore.getState()
        const testData = Array.from({ length: 30 }, (_, i) => ({ id: i }))

        setPage(2)
        const page2 = getPaginatedData(testData)

        expect(page2).toHaveLength(PAGE_SIZE)
        expect(page2[0].id).toBe(PAGE_SIZE)
        expect(page2[PAGE_SIZE - 1].id).toBe(PAGE_SIZE * 2 - 1)
      })

      it('должен возвращать последнюю неполную страницу', () => {
        const { setPage, getPaginatedData } = useTableStore.getState()
        const testData = Array.from({ length: 32 }, (_, i) => ({ id: i }))

        setPage(3)
        const page3 = getPaginatedData(testData)

        expect(page3).toHaveLength(2)
        expect(page3[0].id).toBe(30)
        expect(page3[1].id).toBe(31)
      })
    })

    describe('getTotalPages', () => {
      it('должен правильно вычислять количество страниц', () => {
        const { getTotalPages } = useTableStore.getState()

        expect(getTotalPages(15)).toBe(1)
        expect(getTotalPages(16)).toBe(2)
        expect(getTotalPages(30)).toBe(2)
        expect(getTotalPages(31)).toBe(3)
        expect(getTotalPages(0)).toBe(0)
      })
    })

    describe('setPage', () => {
      it('должен устанавливать номер страницы', () => {
        const { setPage } = useTableStore.getState()

        setPage(3)
        expect(useTableStore.getState().currentPage).toBe(3)

        setPage(1)
        expect(useTableStore.getState().currentPage).toBe(1)
      })
    })

    describe('setFilter с пагинацией', () => {
      it('должен сбрасывать на первую страницу при изменении фильтра', () => {
        const { setPage, setFilter } = useTableStore.getState()

        setPage(3)
        expect(useTableStore.getState().currentPage).toBe(3)

        setFilter('test')
        expect(useTableStore.getState().currentPage).toBe(1)
      })
    })

    describe('selectWorker с пагинацией', () => {
      it('должен сбрасывать на первую страницу при выборе работника', () => {
        const { setPage, selectWorker } = useTableStore.getState()

        setPage(3)
        expect(useTableStore.getState().currentPage).toBe(3)

        selectWorker('W-001')
        expect(useTableStore.getState().currentPage).toBe(1)
      })
    })

    describe('resetToWorkers с пагинацией', () => {
      it('должен сбрасывать на первую страницу', () => {
        const { setPage, selectWorker, resetToWorkers } = useTableStore.getState()

        setPage(3)
        selectWorker('W-001')

        resetToWorkers()
        expect(useTableStore.getState().currentPage).toBe(1)
      })
    })
  })
})
