'use client'

import { addCycleInTodo, getSelectedTodo } from '@/ReduxStore/todos/todosSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxStore'
import React from 'react'

const SelectedTodoDetails = () => {
  const selectedTodo = useAppSelector(getSelectedTodo)
  const dispatch = useAppDispatch()
  return (
    <div className='w-[calc((100%-6rem)/3)]'>
      <h1 className='text-2xl font-bold mb-4'>Selected Todo task details</h1>
      {selectedTodo && (
        <div className='flex flex-col border-slate-400 border-[3px] rounded-md p-6'>
          <p className='font-bold text-lg text-center'>{selectedTodo.text}</p>
          <p className='font-bold'>
            Target Cycles:{' '}
            <span className='font-normal'>{selectedTodo.targetCycles}</span>{' '}
          </p>
          <div className='flex gap-4 flex-wrap'>
            <div className='flex gap-2'>
              <p className='font-bold'>Current worked cycles: </p>
              {selectedTodo.currentCycles} <p></p>
            </div>
            {selectedTodo.currentCycles !== selectedTodo.targetCycles ? (
              <button
                onClick={() => dispatch(addCycleInTodo())}
                className='cursor-pointer rounded-md border border-slate-500 p-4 leading-none text-xl font-bold hover:bg-slate-500 hover:text-slate-100'
              >
                +
              </button>
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
