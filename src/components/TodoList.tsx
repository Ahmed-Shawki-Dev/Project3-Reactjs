import { type ITodo } from '../interfaces'
import Button from '../ui/Button'

interface TodoListProps extends ITodo {
  index: number
}

const TodoList = ({ title, index }: TodoListProps) => {
  const bgColor = index % 2 === 0 ? 'bg-white' : 'bg-gray-200'

  return (
    <div
      className={` min-h-25 h-fit flex items-center pl-4 2xl:px-4 py-5 justify-between w-full  ${bgColor}`}
    >
      <p
        className="break-words w-[50%] md:w-150 2xl:w-200 text-xl 
"
      >
        {title}
      </p>
      <div className="2xl:space-x-2 flex">
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

export default TodoList
