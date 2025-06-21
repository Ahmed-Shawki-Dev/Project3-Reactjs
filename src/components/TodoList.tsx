import { type ITodo } from '../interfaces'
import Button from '../ui/Button'


const TodoList = ({ title }: ITodo) => {
  return (
    <div
      className={`min-h-[100px] flex flex-col w-[90%] m-auto sm:flex-row items-center justify-between  px-4 py-4 rounded-xl shadow-md hover:shadow-lg transition bg-[#f9f9f9] space-y-3 sm:space-y-0 sm:w-[90%] sm:m-auto`}
    >
      <p className="break-words w-full sm:w-[60%] text-center sm:text-left text-lg font-semibold text-gray-800">
        {title}
      </p>
      <div className="flex space-x-3 w-full sm:w-auto justify-center sm:justify-end">
        <Button className="bg-indigo-500 hover:bg-indigo-400 text-white px-3 py-2 rounded-md shadow transition text-sm">
          Edit
        </Button>
        <Button className="bg-red-500 hover:bg-red-400 text-white px-3 py-2 rounded-md shadow transition text-sm">
          Delete
        </Button>
      </div>
    </div>
  )
}

export default TodoList
