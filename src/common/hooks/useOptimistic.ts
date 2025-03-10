import { useState } from 'react'

/**
 * useOptimistic — простой хук для оптимистичного обновления состояния.
 * @param initialState - начальное значение
 * @param reducer - функция, которая описывает, как изменяется состояние
 *                  (текущее состояние, аргумент для изменения) => новое состояние
 *
 * Возвращает кортеж:
 * [optimisticState, applyOptimisticUpdate, rollbackState]
 */
export function useOptimistic<S, A>(
  initialState: S,
  reducer: (prevState: S, optimisticValue: A) => S
) {
  const [optimisticState, setOptimisticState] = useState<S>(initialState)

  function applyOptimisticUpdate(optimisticValue: A) {
    setOptimisticState((prev) => reducer(prev, optimisticValue))
  }
  function rollbackState() {
    setOptimisticState(initialState)
  }

  return [optimisticState, applyOptimisticUpdate, rollbackState] as const
}
