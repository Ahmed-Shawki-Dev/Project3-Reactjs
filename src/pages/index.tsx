import { faker } from '@faker-js/faker'
import { useQueryClient } from '@tanstack/react-query'
import { CircleX } from 'lucide-react'
import { useState, type ChangeEvent, type FormEvent } from 'react'
import InputErrorMessage from '../components/InputErrorMessage'
import SkeletonTodo, { EmptyTodos } from '../components/SkeletonTodo'
import TodoList from '../components/TodoList'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Modal from '../components/ui/Modal'
import Textarea from '../components/ui/Textarea'
import axiosInstance from '../config/axios.config'
import useAuthenticatedQuery from '../hooks/useAuthenticatedQuery'
import useTitle from '../hooks/useTitle'
import type { ITodo } from '../interfaces'
import { AddSchema, EditSchema } from '../validation'

const HomePage = () => {
  useTitle('Home Page')
  const queryClient = useQueryClient()

  // Local States
  const [isUpdating, setIsUpdating] = useState(false)
  const [editError, setEditError] = useState<ITodo>({
    title: '',
    description: '',
    documentId: '',
  })
  const [addError, setAddError] = useState<ITodo>({
    title: '',
    description: '',
  })
  const [todoForEdit, setTodoForEdit] = useState<ITodo>({
    documentId: '',
    title: '',
    description: '',
  })
  const [todoForAdd, setTodoForAdd] = useState({
    title: '',
    description: '',
  })
  const [todoForDelete, setTodoForDelete] = useState('')
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const [isOpenAddModal, setIsOpenAddModal] = useState(false)

  // Get User Data
  const getUser = localStorage.getItem('loggedInUser')
  const userData = getUser ? JSON.parse(getUser) : null

  // Fetch Todos with React Query
  const { data, isLoading } = useAuthenticatedQuery({
    queryKey: ['todos'],
    url: '/users/me?populate=todos',
    config: {
      headers: { Authorization: `Bearer ${userData.jwt}` },
    },
  })
  console.log(data)

  // Handlers
  const openAddModal = () => {
    setIsOpenAddModal(true)
  }

  const closeAddModal = (): boolean => {
    setTodoForAdd({ title: '', description: '' })
    setIsOpenAddModal(false)
    return isOpenAddModal
  }
  const openEditModal = (todo: ITodo) => {
    setTodoForEdit(todo)
    setIsOpenEditModal(true)
  }

  const closeEditModal = (): boolean => {
    setTodoForEdit({ title: '', description: '', documentId: '' })
    setIsOpenEditModal(false)
    return isOpenEditModal
  }

  const openDeleteModal = (documentId: string) => {
    setTodoForDelete(documentId)
    setIsOpenDeleteModal(true)
  }

  const closeDeleteModal = (): boolean => {
    setIsOpenDeleteModal(false)
    return isOpenDeleteModal
  }

  const submitAddHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const addValidation = AddSchema(todoForAdd)
    const hasErrorMsg = Object.values(addValidation).some(value => value !== '')

    if (hasErrorMsg) {
      setAddError(addValidation)
      return
    }
    console.log(todoForAdd)
    await axiosInstance
      .post(
        `/todos`,
        {
          data: {
            title: todoForAdd.title,
            description: todoForAdd.description,
          },
        },
        {
          headers: { Authorization: `Bearer ${userData.jwt}` },
        }
      )
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['todos'] })
      })
      .catch()
      .finally(() => {
        closeAddModal()
      })
  }

  const generateTodos = async () => {
    for (let i = 0; i < 100; i++) {
      await axiosInstance
        .post(
          `/todos`,
          {
            data: {
              title: faker.word.words(5),
              description: faker.lorem.paragraph(2),
            },
          },
          {
            headers: { Authorization: `Bearer ${userData.jwt}` },
          }
        )
        .then(() => {
          queryClient.invalidateQueries({ queryKey: ['todos'] })
        })
        .catch(error => console.log(error))
    }
  }

  const submitEditHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsUpdating(true)
    const editValidation = EditSchema(todoForEdit)
    const hasErrorMsg = Object.values(editValidation).some(
      value => value !== ''
    )

    if (hasErrorMsg) {
      setEditError(editValidation)
      setIsUpdating(false)
      return
    }
    await axiosInstance
      .put(
        `/todos/${todoForEdit.documentId}`,
        {
          data: {
            title: todoForEdit.title,
            description: todoForEdit.description,
          },
        },
        {
          headers: { Authorization: `Bearer ${userData.jwt}` },
        }
      )
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['todos'] })
      })
      .catch()
      .finally(() => {
        closeEditModal()
        setIsUpdating(false)
      })
  }

  const deleteTodo = async () => {
    await axiosInstance
      .delete(`/todos/${todoForDelete}`, {
        headers: { Authorization: `Bearer ${userData.jwt}` },
      })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['todos'] })
      })
      .catch()
      .finally(() => {
        closeDeleteModal()
      })
  }

  // Loading State
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-start w-full space-y-6 mt-10">
        {Array.from({ length: 3 }, (_, index) => (
          <SkeletonTodo key={index} />
        ))}
      </div>
    )
  }
  console.log(data.todos.reverse())
  // Render Component
  return (
    <div className="w-full min-h-full flex-col flex justify-start items-center pt-20 bg-surface-alt text-text">
      <div className="w-full 2xl:w-[60%] flex flex-col items-start space-y-6">
        <div className="flex justify-center w-full space-x-4">
          <Button onClick={() => openAddModal()}>Add A New Todo </Button>
          <Button
            onClick={generateTodos}
            className="bg-secondary bg-secondary-hover text-on-secondary"
          >
            Generate Todos
          </Button>
        </div>
        {data.todos.length ? (
          data.todos.map(({ title, description, documentId }: ITodo) => (
            <div key={documentId} className="w-full space-y-2">
              <TodoList
                title={title}
                description={description}
                openEditModal={() =>
                  openEditModal({ title, description, documentId })
                }
                openDeleteModal={() => openDeleteModal(documentId || '')}
              />
            </div>
          ))
        ) : (
          <EmptyTodos />
        )}

        {/* Add Modal */}
        <Modal isOpen={isOpenAddModal} close={closeAddModal} title="Add Todo">
          <form onSubmit={submitAddHandler} className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Title
              </label>
              <Input
                placeholder="Enter a catchy title..."
                value={todoForAdd.title || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  console.log(e.target.value)
                  setTodoForAdd(prev => ({ ...prev, title: e.target.value }))
                  setAddError({ title: '' })
                }}
                className="w-full border border-solid border-[var(--color-border)] rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-surface shadow-sm transition "
              />
              {addError.title && <InputErrorMessage msg={addError.title} />}
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Description
              </label>
              <Textarea
                placeholder="Enter a useful description..."
                value={todoForAdd.description || ''}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                  console.log(e.target.value)
                  setTodoForAdd(prev => ({
                    ...prev,
                    description: e.target.value,
                  }))
                  setAddError(prev => ({ ...prev, description: '' }))
                }}
                className="w-full border border-solid border-[var(--color-border)] rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-surface shadow-sm transition resize-none min-h-[100px]"
              />
              {addError.description && (
                <InputErrorMessage msg={addError.description} />
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button
                width="w-fit"
                color="primary"
                className="flex items-center justify-center disabled:bg-disabled"
              >
                Add
              </Button>
              <Button
                type="button"
                onClick={closeAddModal}
                color="gray"
                className="px-5 py-2 rounded-xl shadow-sm text-sm font-semibold transition"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={isOpenEditModal}
          close={closeEditModal}
          title="Edit Todo"
        >
          <form onSubmit={submitEditHandler} className="space-y-6">
            {/* Title Field */}
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Title
              </label>
              <Input
                placeholder="Enter a catchy title..."
                value={todoForEdit.title || ''}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setTodoForEdit(prev => ({ ...prev, title: e.target.value }))
                  setEditError({ title: '' })
                }}
                className="w-full border border-solid border-[var(--color-border)] rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-surface shadow-sm transition "
              />
              {editError.title && <InputErrorMessage msg={editError.title} />}
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-text mb-1">
                Description
              </label>
              <Textarea
                placeholder="Enter a useful description..."
                value={todoForEdit.description || ''}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                  setTodoForEdit(prev => ({
                    ...prev,
                    description: e.target.value,
                  }))
                  setEditError(prev => ({ ...prev, description: '' }))
                }}
                className="w-full border border-solid border-[var(--color-border)] rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-surface shadow-sm transition resize-none min-h-[100px]"
              />
              {editError.description && (
                <InputErrorMessage msg={editError.description} />
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button
                isLoading={isUpdating}
                width="w-fit"
                color="primary"
                className="flex items-center justify-center disabled:bg-disabled"
              >
                {isUpdating ? (
                  <span className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                ) : (
                  'Update'
                )}
              </Button>
              <Button
                type="button"
                onClick={closeEditModal}
                color="gray"
                className="px-5 py-2 rounded-xl shadow-sm text-sm font-semibold transition"
              >
                Cancel
              </Button>
            </div>
          </form>
        </Modal>

        {/* Delete Modal */}
        <Modal isOpen={isOpenDeleteModal} close={closeDeleteModal}>
          <div className="flex items-center space-x-3 mb-6">
            <CircleX className="text-error w-7 h-7" />
            <p className="font-semibold text-lg text-text">Delete this todo?</p>
          </div>
          <p className="text-sm text-text-secondary mb-8 leading-relaxed">
            This action cannot be undone. Are you sure you want to permanently
            delete this todo?
          </p>
          <div className="flex justify-end space-x-4 pt-4">
            <Button
              width="w-fit"
              onClick={deleteTodo}
              color="error"
              className="flex items-center justify-center disabled:bg-disabled"
            >
              Delete
            </Button>
            <Button
              type="button"
              onClick={closeDeleteModal}
              color="gray"
              className="px-5 py-2 rounded-xl shadow-sm text-sm font-semibold transition"
            >
              Cancel
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default HomePage

export { default as Profile } from './Profile'
