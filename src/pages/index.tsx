import TodoList from '../components/TodoList'
import { todos } from '../data'

const HomePage = () => {
  return (
    <div className="w-full flex items-start justify-center pt-20  ">
      <div className="w-full 2xl:w-[60%] flex flex-col h-full items-center">
        {todos.map((todo, index) => (
          <div key={todo.id} className="w-full">
            <span className="text-xs text-gray-500">
              Task Number: {index + 1}
            </span>{' '}
            <TodoList title={todo.title} index={index} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage
