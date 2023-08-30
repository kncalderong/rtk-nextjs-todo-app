'use client'

import { getSelectedTodo } from '@/ReduxStore/todos/todosSlice'
import { useAppSelector } from '@/hooks/reduxStore'
import React from 'react'

const SelectedTodoDetails = () => {
  const selectedTodo = useAppSelector(getSelectedTodo)

  return (
    <div className='w-[calc((100%-6rem)/3)]'>
      <h1 className='text-2xl font-bold mb-4'>Selected Todo details</h1>
      {selectedTodo && (
        <div className='flex flex-col border-slate-400 border-[3px] rounded-md p-6'>
          <p className='font-bold'>
            Task: <span className='font-normal'>{selectedTodo.text}</span>{' '}
          </p>
          <p className='font-bold'>
            Target Cycles:{' '}
            <span className='font-normal'>{selectedTodo.targetCycles}</span>{' '}
          </p>
        </div>
      )}
    </div>
  )
}

export default SelectedTodoDetails
