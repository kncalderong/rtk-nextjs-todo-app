'use client'

import {
  getSelectedTodo,
  useFetchTodosQuery,
  useUpdateTodoMutation,
} from '@/ReduxStore/todos/todosSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxStore'
import React from 'react'
import Spinner from './Spinner'

const SelectedTodoDetails = () => {
  const { data: todos } = useFetchTodosQuery()
  const selectedTodo = useAppSelector(getSelectedTodo(todos))

  const modifyingTodoId = useAppSelector((state) => state.todos.modifyingTodoId)
  const [addCycleInTodo, { isLoading: isLoadingUpdateTodo }] =
    useUpdateTodoMutation()

  return (
    <div className='w-[calc((100%-6rem)/3)]'>
      <h1 className='text-2xl font-bold mb-4'>Selected Todo task details</h1>
      {selectedTodo && (
        <div className='flex flex-col border-slate-400 border-[3px] rounded-md p-6'>
          <p className='font-bold text-lg text-center'>
            {selectedTodo.attributes.text}
          </p>
          <p className='font-bold'>
            Target Cycles:{' '}
            <span className='font-normal'>
              {selectedTodo.attributes.targetCycles}
            </span>{' '}
          </p>
          <div className='flex gap-4 flex-wrap'>
            <div className='flex gap-2'>
              <p className='font-bold'>Current worked cycles: </p>
              {selectedTodo.attributes.currentCycles} <p></p>
            </div>
            {selectedTodo.attributes.currentCycles !==
            selectedTodo.attributes.targetCycles ? (
              isLoadingUpdateTodo && modifyingTodoId === selectedTodo.id ? (
                <Spinner show />
              ) : (
                <button
                  onClick={() => {
                    addCycleInTodo(selectedTodo)
                  }}
                  className='cursor-pointer rounded-md border border-slate-500 p-4 leading-none text-xl font-bold hover:bg-slate-500 hover:text-slate-100'
                  disabled={isLoadingUpdateTodo}
                >
                  +
                </button>
              )
            ) : (
              <div className='p-2 rounded-md border border-green-800 bg-green-200 font-bold'>
                Completed!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default SelectedTodoDetails
