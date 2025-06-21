import TodoList from '../components/TodoList'

import useAuthenticatedQuery from '../hooks/useAuthenticatedQuery'
import type { ITodo } from '../interfaces'

const HomePage = () => {
  const getUser = localStorage.getItem('loggedInUser')
  const userData = getUser ? JSON.parse(getUser) : null

  const { data, isLoading} = useAuthenticatedQuery({
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
              <TodoList title={title} />
            </div>
          ))
        ) : (
          <h3>Empty</h3>
        )}
      </div>
    </div>
  )
}

export default HomePage
