export interface TodoItem {
  id: string
  attributes: {
    createdAt: string
    updatedAt: string
    publishedAt: string
  } & TodoItemData
}

export interface TodoItemData {
  text: string
  targetCycles: number
  currentCycles: number
}
