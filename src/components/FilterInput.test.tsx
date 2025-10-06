import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { FilterInput } from './FilterInput'

describe('FilterInput', () => {
  it('должен отображать placeholder по умолчанию', () => {
    render(<FilterInput value="" onChange={() => {}} />)

    expect(screen.getByPlaceholderText('Поиск...')).toBeInTheDocument()
  })

  it('должен отображать кастомный placeholder', () => {
    const placeholder = 'Поиск работников...'
    render(<FilterInput value="" onChange={() => {}} placeholder={placeholder} />)

    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
  })

  it('должен отображать текущее значение', () => {
    render(<FilterInput value="test value" onChange={() => {}} />)

    const input = screen.getByDisplayValue('test value')
    expect(input).toBeInTheDocument()
  })

  it('должен вызывать onChange при вводе текста', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(<FilterInput value="" onChange={handleChange} />)

    const input = screen.getByPlaceholderText('Поиск...')
    await user.type(input, 'test')

    expect(handleChange).toHaveBeenCalled()
    // Должен быть вызван 4 раза (по одному на каждую букву)
    expect(handleChange).toHaveBeenCalledTimes(4)
  })

  it('должен передавать правильное значение в onChange', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(<FilterInput value="" onChange={handleChange} />)

    const input = screen.getByPlaceholderText('Поиск...')
    await user.type(input, 'a')

    expect(handleChange).toHaveBeenCalledWith('a')
  })

  it('должен отображать иконку поиска', () => {
    const { container } = render(<FilterInput value="" onChange={() => {}} />)

    // Ищем SVG иконку
    const icon = container.querySelector('svg')
    expect(icon).toBeInTheDocument()
  })
})
