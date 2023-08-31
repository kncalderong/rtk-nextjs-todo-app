'use client'

import { removeTodo, selectTodo } from '@/ReduxStore/todos/todosSlice'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxStore'
import React from 'react'

const DispalyTodos = () => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector((state) => state.todos.todos)

  return (
    <div className='w-[calc((100%-6rem)/3)]'>
      <h1 className='text-2xl font-bold mb-4'>Todos</h1>
      <ul className='flex flex-col gap-4'>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className='flex justify-between bg-slate-300 px-6 py-3 rounded-lg shadow-sm'
          >
            <div
              className={`cursor-pointer hover:underline font-bold ${
                todo.currentCycles === todo.targetCycles && 'line-through'
              }`}
              onClick={() => dispatch(selectTodo(todo.id))}
            >
              {todo.text}
            </div>
            <div
              className='cursor-pointer text-red-800 font-bold'
              onClick={() => dispatch(removeTodo(todo))}
            >
              X
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default DispalyTodos
