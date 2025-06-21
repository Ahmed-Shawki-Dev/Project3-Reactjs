import TodoList from '../components/TodoList'
import Button from '../ui/Button'
import Input from '../ui/Input'

import { useState } from 'react'
import useAuthenticatedQuery from '../hooks/useAuthenticatedQuery'
import useTitle from '../hooks/useTitle'
import type { ITodo } from '../interfaces'
import Modal from '../ui/Modal'
import Textarea from '../ui/Textarea'

const HomePage = () => {
  useTitle('Home Page')
  const [isOpenEditModal, setIsOpenEditModal] = useState(false)

  function openEditModal() {
    setIsOpenEditModal(true)
  }

  function closeEditModal() {
    setIsOpenEditModal(false)
  }

  const getUser = localStorage.getItem('loggedInUser')
  const userData = getUser ? JSON.parse(getUser) : null

  const { data, isLoading } = useAuthenticatedQuery({
    queryKey: ['todos'],
    url: '/users/me?populate=todos',
    config: {
      headers: {
        Authorization: `Bearer ${userData.jwt}`,
      },
    },
  })

  if (isLoading) return <h3>Loading...</h3>

  return (
    <div className="w-full min-h-full flex-col bg-[#aaaaaa23] flex justify-start items-center pt-20">
      <div className="w-full 2xl:w-[60%] flex flex-col items-start space-y-6">
        {data.todos.length ? (
          data &&
          data?.todos?.map(({ title, id }: ITodo) => (
            <div key={id} className="w-full space-y-2">
              <TodoList title={title} openModal={openEditModal} />
            </div>
          ))
        ) : (
          <h3>Empty</h3>
        )}
        <Modal
          isOpen={isOpenEditModal}
          close={closeEditModal}
          title="Edit Panel"
        >
          <Input placeholder="Title" />
          <Textarea className="w-full mt-5" placeholder="description" />
          <div className="mt-5 space-x-3">
            <Button className="bg-indigo-500 hover:bg-indigo-300">Edit</Button>
            <Button
              onClick={closeEditModal}
              className="bg-gray-300 hover:bg-gray-400"
            >
              Close
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default HomePage
