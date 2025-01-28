import { action, computed, makeObservable, observable } from 'mobx'

export class Collection<T extends { id: number | string }> {
  currentIndex: number = 0
  items: T[] = []

  constructor() {
    makeObservable(
      this,
      {
        addItem: action,
        allItems: computed,
        applyActionToAll: action,
        clear: action,
        count: computed,
        currentArrIndex: computed,
        currentIndex: observable,
        getById: action,
        getByIndex: action,
        isEmpty: computed,
        items: observable,
        removeItem: action,
        setCurrentIndex: action,
      },
      { autoBind: true }
    )
  }

  addItem(item: T) {
    this.items.push(item)
  }

  applyActionToAll(action: (item: T) => Promise<void> | void) {
    const promises = this.items.map((item) => action(item))

    return Promise.all(promises)
  }

  clear() {
    this.currentIndex = 0
    this.items = []
  }

  getByCurrentIndex() {
    return this.items[this.currentIndex]
  }

  getById(id: number | string) {
    return this.items.find((item) => item.id === id)
  }

  getByIndex(index: number) {
    return this.items[index]
  }

  removeItem(id: string) {
    this.items = this.items.filter((item) => item.id !== id)
  }

  setCurrentIndex(index: number) {
    this.currentIndex = index
  }

  get allItems() {
    return this.items
  }

  get count() {
    return this.items.length
  }

  get currentArrIndex() {
    return this.currentIndex
  }

  get isEmpty() {
    return this.items.length === 0
  }
}
