'use client'

import {
  selectTodo,
  useFetchTodosQuery,
  useRemoveTodoMutation,
} from '@/ReduxStore/todos/todosSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxStore'
import React from 'react'
import Spinner from './Spinner'

const DispalyTodos = () => {
  const dispatch = useAppDispatch()

  const deletingTodoId = useAppSelector((state) => state.todos.deletingTodoId)

  const {
    data: todos,
    isSuccess: isFetchTodosSuccess,
    isLoading: isLoadingTodos,
  } = useFetchTodosQuery()

  const [removeTodo, { isLoading: isRemoveTodoPending }] =
    useRemoveTodoMutation()

  return (
    <div className='w-[calc((100%-6rem)/3)]'>
      <h1 className='text-2xl font-bold mb-4'>Todos</h1>
      {isLoadingTodos ? (
        <Spinner show />
      ) : isFetchTodosSuccess && todos.length > 0 ? (
        <ul className='flex flex-col gap-4'>
          {todos.map((todo) => (
            <li
              key={todo.id}
              className='flex justify-between bg-slate-300 px-6 py-3 rounded-lg shadow-sm'
            >
              <div
                className={`cursor-pointer hover:underline font-bold ${
                  todo.attributes.currentCycles ===
                    todo.attributes.targetCycles &&
                  'line-through pointer-events-none'
                }`}
                onClick={() => dispatch(selectTodo(todo.id))}
              >
                {todo.attributes.text}
              </div>
              {deletingTodoId === todo.id && isRemoveTodoPending ? (
                <Spinner show size='sm' />
              ) : (
                <div
                  className='cursor-pointer text-red-800 font-bold'
                  onClick={() => removeTodo(todo)}
                >
                  X
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default DispalyTodos
