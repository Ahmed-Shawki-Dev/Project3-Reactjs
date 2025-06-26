import { type ITodo } from '../interfaces'
<<<<<<< HEAD
import Button from './ui/Button'

interface IProps extends ITodo {
  openEditModal?: () => void
  openDeleteModal?: () => void
=======
import Button from '../ui/Button'

interface IProps extends ITodo {
  openEditModal: () => void
  openDeleteModal: () => void
>>>>>>> 4f159f7275c4f460cba007b7cfc90366eac4ddee
}

const TodoList = ({
  title,
  description,
  openEditModal,
  openDeleteModal,
}: IProps) => {
  return (
    <div className="min-h-[120px] w-[90%] mx-auto bg-surface rounded-xl shadow-md hover:shadow-lg transition p-5 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between text-text">
      {/* Text Content */}
      <div className="w-full sm:w-[70%] space-y-2">
        <p className="text-lg font-semibold text-text break-words">{title}</p>
        <p className="text-sm text-text-secondary break-words leading-relaxed">
          {description}
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-row sm:flex-row gap-3 w-full sm:w-auto justify-center sm:justify-end">
        <Button
          onClick={openEditModal}
          color="primary"
          className="px-4 py-2 rounded-xl shadow-sm text-sm font-medium transition"
        >
          Edit
        </Button>
        <Button
          onClick={openDeleteModal}
          color="error"
          className="px-4 py-2 rounded-xl shadow-sm text-sm font-medium transition"
        >
          Delete
        </Button>
      </div>
    </div>
  )
}

export default TodoList
