import { Nullable } from '@/common'

type HasId<N> = {
  id: N
}
/**
 *
 * @param array of objects (id is required parameter)
 * @param id of object to find
 */
export const findObjectInArray = <T extends HasId<N>, N>(
  array: Array<T>,
  id: N
): Nullable<T> => {
  return array.find((el) => el.id === id) ?? null
}
