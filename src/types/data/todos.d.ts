export interface TodoItem extends TodoItemData {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

export interface TodoItemData {
  text: string
  targetCycles: number
  currentCycles: number
}
