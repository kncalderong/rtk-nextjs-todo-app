import { TodoItem } from '@/types/data/todos'
import { v4 as uuidv4 } from 'uuid'

const initialTodos: TodoItem[] = [
  {
    id: uuidv4(),
    text: 'take breakfast',
    targetCycles: 1,
    currentCycles: 0,
  },
  {
    id: uuidv4(),
    text: 'mobility routine',
    targetCycles: 2,
    currentCycles: 0,
  },
  {
    id: uuidv4(),
    text: 'English practice',
    targetCycles: 1,
    currentCycles: 0,
  },
]

export default initialTodos
