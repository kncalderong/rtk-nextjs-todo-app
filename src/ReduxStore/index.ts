import { configureStore } from '@reduxjs/toolkit'
import todosReducer, { todosApiSlice } from '@/ReduxStore/todos/todosSlice'

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    [todosApiSlice.reducerPath]: todosApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todosApiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
