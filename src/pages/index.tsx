import TodoItem from '../components/Todo'
import { todos } from '../data'



const HomePage = () => {
  return (
    <div className="w-full flex items-start justify-center pt-20  ">
      <div className="w-full 2xl:w-[60%] flex flex-col h-full items-center">
        {todos.map((todo, index) => (
          <TodoItem key={todo.id} title={todo.title} index={index} />
        ))}
      </div>
    </div>
  )
}

export default HomePage
