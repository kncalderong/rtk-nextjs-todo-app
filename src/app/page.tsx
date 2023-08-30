import AddTodo from '@/components/AddTodo'
import DispalyTodos from '@/components/DisplayTodos'
import SelectedTodoDetails from '@/components/SelectedTodoDetails'

export default function Home() {
  return (
    <main className='w-full min-h-screen py-24'>
      <section className='w-[90%] flex flex-col mx-auto'>
        <h1 className='text-3xl font-bold mb-8'>Todo app to test RTK</h1>
        <div className='w-full flex gap-12'>
          <AddTodo />
          <DispalyTodos />
          <SelectedTodoDetails />
        </div>
      </section>
    </main>
  )
}
