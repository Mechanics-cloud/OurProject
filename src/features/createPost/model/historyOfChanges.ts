import { Nullable } from '@/common'

export class HistoryStage {
  next: Nullable<HistoryStage>
  prev: Nullable<HistoryStage>
  value: any

  constructor(
    value: any,
    prev: Nullable<HistoryStage> = null,
    next: Nullable<HistoryStage> = null
  ) {
    this.value = value
    this.next = next
    this.prev = prev
  }
}

export class History {
  head: Nullable<HistoryStage> = null
  tail: Nullable<HistoryStage> = null

  public addStep(value: any) {
    if (this.tail) {
      const step = new HistoryStage(value, this.tail, null)

      this.tail.next = step
      this.tail = step
    } else {
      const step = new HistoryStage(value, null, null)

      this.tail = step
      this.head = step
    }
  }

  public removeStep() {
    if (!this.tail) {
      return null
    }

    const result = this.tail.value

    if (this.head === this.tail) {
      this.tail = null
      this.head = null
    } else {
      this.tail = this.tail.prev
      if (this.tail) {
        this.tail.next = null
      }
    }

    return result
  }
}
