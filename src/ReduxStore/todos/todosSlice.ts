import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit'
import { TodoItem, TodoItemData } from '@/types/data/todos'
import { RootState } from '@/ReduxStore'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { request, gql, ClientError } from 'graphql-request'
export interface TodosState {
  deletingTodoId: TodoItem['id'] | undefined
  modifyingTodoId: TodoItem['id'] | undefined
  selectedTodoId: TodoItem['id'] | undefined
}

const initialState: TodosState = {
  deletingTodoId: undefined,
  selectedTodoId: undefined,
  modifyingTodoId: undefined,
}

export const todosApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337',
  }),
  tagTypes: ['Todos'],
  endpoints: (builder) => ({
    fetchTodos: builder.query<TodoItem[], void>({
      query: () => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: gql`
            query {
              todos {
                data {
                  id
                  attributes {
                    text
                    currentCycles
                    targetCycles
                  }
                }
              }
            }
          `,
        },
      }),
      transformResponse: (response: any) => {
        console.log('response: ', response)
        return response.data.todos.data
      },
      providesTags: ['Todos'],
    }),
    createTodo: builder.mutation<{ todo: TodoItem }, TodoItemData>({
      query: (todo) => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: gql`
            mutation CreateTodo($data: TodoInput!) {
              createTodo(data: $data) {
                data {
                  id
                  attributes {
                    text
                    targetCycles
                    currentCycles
                  }
                }
              }
            }
          `,
          variables: {
            data: todo,
          },
        },
      }),
      invalidatesTags: ['Todos'],
    }),
    removeTodo: builder.mutation<boolean, TodoItem>({
      query: (todo) => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: gql`
            mutation DeleteTodo($id: ID!) {
              deleteTodo(id: $id) {
                data {
                  id
                  attributes {
                    text
                    targetCycles
                    currentCycles
                  }
                }
              }
            }
          `,
          variables: {
            id: todo.id,
          },
        },
      }),
      invalidatesTags: ['Todos'],
      onQueryStarted: async (todo, { dispatch, queryFulfilled }) => {
        dispatch(setDeletingTodoId(todo.id))
        await queryFulfilled
        dispatch(setDeletingTodoId(undefined))
      },
    }),
    updateTodo: builder.mutation<{ todo: TodoItemData }, TodoItem>({
      query: (todo) => ({
        url: '/graphql',
        method: 'POST',
        body: {
          query: gql`
            mutation UpdateTodo($id: ID!, $data: TodoInput!) {
              updateTodo(id: $id, data: $data) {
                data {
                  id
                  attributes {
                    text
                    targetCycles
                    currentCycles
                  }
                }
              }
            }
          `,
          variables: {
            id: todo.id,
            data: {
              currentCycles:
                todo.attributes.currentCycles < todo.attributes.targetCycles
                  ? todo.attributes.currentCycles + 1
                  : todo.attributes.currentCycles,
            },
          },
        },
      }),
      invalidatesTags: ['Todos'],
      onQueryStarted: async (todo, { dispatch, queryFulfilled }) => {
        dispatch(setModifyingTodoId(todo.id))
        await queryFulfilled
        dispatch(setModifyingTodoId(undefined))
      },
    }),
  }),
})

export const {
  useFetchTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useRemoveTodoMutation,
} = todosApiSlice

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    selectTodo: (state: TodosState, action: PayloadAction<string>) => {
      state.selectedTodoId = action.payload
    },
    setDeletingTodoId: (state, action: PayloadAction<string | undefined>) => {
      state.deletingTodoId = action.payload
    },
    setModifyingTodoId: (state, action: PayloadAction<string | undefined>) => {
      state.modifyingTodoId = action.payload
    },
    resetTodosSlice: () => {
      return initialState
    },
  },
})

export const {
  selectTodo,
  setDeletingTodoId,
  resetTodosSlice,
  setModifyingTodoId,
} = todosSlice.actions

export const resetUsersApiSlice = () => todosApiSlice.util.resetApiState()

export const initialiseTodosApi = () =>
  todosApiSlice.endpoints.fetchTodos.initiate()

//this is a  curried function,  This pattern allows you to create a reusable function that generates a new function specific to your use case. In this case, getSelectedUser can be partially applied with the users array, and then you can apply the generated function with the state argument later. This separation of concerns makes the code more modular and flexible.

export const getSelectedTodo = (todos?: TodoItem[]) => (state: RootState) => {
  return todos && state.todos.selectedTodoId
    ? todos.find((todo) => todo.id === state.todos.selectedTodoId)
    : null
}

export default todosSlice.reducer
