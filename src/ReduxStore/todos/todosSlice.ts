import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import initialTodos from './initialTodos'
import { TodoItem } from '@/types/data/todos'
import { RootState } from '@/ReduxStore'

export interface TodosState {
  todos: TodoItem[]
  selectedTodoId: TodoItem['id'] | undefined
}

const initialState: TodosState = {
  todos: initialTodos,
  selectedTodoId: undefined,
}

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state: TodosState, action: PayloadAction<TodoItem[]>) => {
      state.todos = action.payload
    },
    addTodo: (state: TodosState, action: PayloadAction<TodoItem>) => {
      state.todos.push(action.payload)
    },
    removeTodo: (state: TodosState, action: PayloadAction<TodoItem>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id)
    },
    selectTodo: (state: TodosState, action: PayloadAction<string>) => {
      state.selectedTodoId = action.payload
    },
  },
})

export const { setTodos, addTodo, removeTodo, selectTodo } = todosSlice.actions

//this is to memoize the selection of one Item, if the idToSelect or the item itself does not change, then the cached item is returned without filtering again
export const getSelectedTodo = createSelector(
  (state: RootState) => state.todos,
  (todos) => {
    if (todos.selectedTodoId) {
      return todos.todos.find(
        (todo: TodoItem) => todo.id === todos.selectedTodoId
      )
    }
    return null
  }
)

export default todosSlice.reducer
