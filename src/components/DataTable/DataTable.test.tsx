import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { DataTable } from './DataTable'
import type { ColumnConfig, Worker } from '@/types'

const mockWorkers: Worker[] = [
  {
    id: 'W-001',
    name: 'Иван Иванов',
    position: 'Developer',
    email: 'ivan@test.com',
    tasksCount: 5
  },
  {
    id: 'W-002',
    name: 'Мария Петрова',
    position: 'Designer',
    email: 'maria@test.com',
    tasksCount: 3
  }
]

const mockColumns: ColumnConfig<Worker>[] = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Имя' },
  { key: 'position', header: 'Должность' }
]

describe('DataTable', () => {
  it('должен отображать заголовки колонок', () => {
    render(<DataTable data={mockWorkers} columns={mockColumns} />)

    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Имя')).toBeInTheDocument()
    expect(screen.getByText('Должность')).toBeInTheDocument()
  })

  it('должен отображать данные', () => {
    render(<DataTable data={mockWorkers} columns={mockColumns} />)

    expect(screen.getByText('W-001')).toBeInTheDocument()
    expect(screen.getByText('Иван Иванов')).toBeInTheDocument()
    expect(screen.getByText('Developer')).toBeInTheDocument()

    expect(screen.getByText('W-002')).toBeInTheDocument()
    expect(screen.getByText('Мария Петрова')).toBeInTheDocument()
    expect(screen.getByText('Designer')).toBeInTheDocument()
  })

  it('должен отображать сообщение когда нет данных', () => {
    render(<DataTable data={[]} columns={mockColumns} />)

    expect(screen.getByText('Нет данных для отображения')).toBeInTheDocument()
  })

  it('должен отображать кастомное сообщение когда нет данных', () => {
    const customMessage = 'Работники не найдены'
    render(<DataTable data={[]} columns={mockColumns} emptyMessage={customMessage} />)

    expect(screen.getByText(customMessage)).toBeInTheDocument()
  })

  it('должен вызывать onRowClick при клике на строку', async () => {
    const user = userEvent.setup()
    const handleRowClick = vi.fn()

    render(<DataTable data={mockWorkers} columns={mockColumns} onRowClick={handleRowClick} />)

    const firstRow = screen.getByText('Иван Иванов').closest('tr')
    expect(firstRow).toBeInTheDocument()

    if (firstRow) {
      await user.click(firstRow)
      expect(handleRowClick).toHaveBeenCalledWith(mockWorkers[0])
    }
  })

  it('должен отображать кастомный рендер ячейки', () => {
    const columnsWithCustomRender: ColumnConfig<Worker>[] = [
      { key: 'id', header: 'ID' },
      {
        key: 'name',
        header: 'Имя',
        render: (value) => <strong data-testid="custom-name">{String(value)}</strong>
      }
    ]

    render(<DataTable data={mockWorkers} columns={columnsWithCustomRender} />)

    const customElements = screen.getAllByTestId('custom-name')
    expect(customElements).toHaveLength(2)
    customElements.forEach(element => {
      expect(element.tagName).toBe('STRONG')
    })
  })
})
