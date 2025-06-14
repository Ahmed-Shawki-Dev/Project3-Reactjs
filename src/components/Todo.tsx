import { type ITodoItem } from '../interfaces'
import Button from '../ui/Button'

interface TodoItemProps extends ITodoItem {
  index: number
}

const TodoItem = ({ title, index }: TodoItemProps) => {
  const bgColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-200'

  return (
    <div
      className={`h-20 flex items-center px-4 py-2 justify-between w-full ${bgColor}`}
    >
      <h3>{title}</h3>
      <div className="2xl:space-x-2">
        <Button className="bg-indigo-600 hover:bg-indigo-500 scale-75 2xl:scale-100">
          Edit
        </Button>
        <Button className="bg-red-600 hover:bg-red-500 scale-75 2xl:scale-100">
          Delete
        </Button>
      </div>
    </div>
  )
}

export default TodoItem
