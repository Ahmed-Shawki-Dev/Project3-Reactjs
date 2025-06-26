import { useState } from 'react'
import SkeletonTodo, { EmptyTodos } from '../components/SkeletonTodo'
import TodoList from '../components/TodoList'
import Paginator from '../components/ui/Paginator'
import useAuthenticatedQuery from '../hooks/useAuthenticatedQuery'
import type { ITodo } from '../interfaces'

const TodosPage = () => {
  const [page, setPage] = useState(1)
  // Get User Data
  const getUser = localStorage.getItem('loggedInUser')
  const userData = getUser ? JSON.parse(getUser) : null

  // Fetch Todos with React Query
  const { data, isLoading } = useAuthenticatedQuery({
    queryKey: ['todospagination',`${page}`],
    url: `/todos?pagination[pageSize]=30&pagination[page]=${page}`,
    config: {
      headers: { Authorization: `Bearer ${userData.jwt}` },
    },
  })
  console.log(data)


  // * Handlers
  const onClickPrev = () => {
    setPage(page - 1)
    scroll(0, 0)
  }

  const onClickNext = () => {
    setPage(page + 1)
    scroll(0, 0)
  }

  const onClickEnd = () => {
    setPage(data.meta.pagination.pageCount)
    scroll(0, 0)
  }
  const onClickStart = () => {
    setPage(1)
    scroll(0, 0)
  }

  const onClickSpecificPage = (p:number)=>{
   setPage(p)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full space-y-6 mt-10 ">
        {Array.from({ length: 3 }, (_, index) => (
          <SkeletonTodo key={index} />
        ))}
      </div>
    )
  }
console.log(data)
  return (
    <div className="space-y-10 m-auto w-full">
      <h2 className="text-center mt-10 text-5xl font-bold">All The Todos</h2>
      <div className="space-y-5">
        {data.data.length ? (
          data.data.map(({ title, description, documentId }: ITodo) => (
            <div key={documentId} className="w-full space-y-2">
              <TodoList title={title} description={description} />
            </div>
          ))
        ) : (
          <EmptyTodos />
        )}

        <Paginator
          page={page}
          pageCount={data.meta.pagination.pageCount}
          total={data.meta.pagination.total}
          onClickPrev={onClickPrev}
          onClickNext={onClickNext}
          onClickEnd={onClickEnd}
          onClickStart={onClickStart}
          onClickSpecificPage={onClickSpecificPage}
        />
      </div>
    </div>
  )
}

export default TodosPage
