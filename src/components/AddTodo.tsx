'use client'

import { useCreateTodoMutation } from '@/ReduxStore/todos/todosSlice'
import React, { useEffect, useRef } from 'react'

const AddTodo = () => {
  const textRef = useRef<HTMLInputElement>(null)
  const targetCyclesRef = useRef<HTMLInputElement>(null)

  const [addTodo, { isLoading: isAddingTodo, isSuccess: isAddTodoSuccess }] =
    useCreateTodoMutation()

  const createTodo = async (e: React.FormEvent) => {
    e.preventDefault()

    addTodo({
      text: textRef.current!.value,
      targetCycles: +targetCyclesRef.current!.value,
      currentCycles: 0,
    })
  }

  useEffect(() => {
    if (isAddTodoSuccess) {
      resetForm()
    }
  }, [isAddTodoSuccess])

  const resetForm = () => {
    textRef.current!.value = ''
    targetCyclesRef.current!.value = ''
  }

  return (
    <form
      onSubmit={createTodo}
      className='flex gap-2 flex-col w-[calc((100%-6rem)/3)]'
    >
      <h1 className='text-2xl font-bold mb-4'>Add new todo</h1>
      <input
        type='text'
        name='text'
        className='border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100'
        placeholder='Todo text'
        required
        ref={textRef}
      />
      <input
        type='number'
        name='targetCycles'
        className='border border-slate-300 bg-transparent rounded px-2 py-1 outline-none focus-within:border-slate-100'
        placeholder='Target Cycles'
        min={1}
        required
        ref={targetCyclesRef}
      />

      <div className='flex gap-1 justify-end'>
        <button
          type='submit'
          className='border border-slate-300 text-slate-500 px-2 py-1 rounded hover:bg-slate-700 hover:text-slate-200 focus-within:bg-slate-700 outline-none'
          disabled={isAddingTodo}
        >
          {isAddingTodo ? 'Adding...' : 'Add Todo'}
        </button>
      </div>
    </form>
  )
}

export default AddTodo
