import { MoveLeft, MoveRight } from 'lucide-react'
import Button from './Button'

interface IProps {
  page: number
  pageCount: number
  total: number
  onClickPrev: () => void
  onClickNext: () => void
  onClickEnd: () => void
  onClickStart: () => void
  onClickSpecificPage: (p:number) => void
}

const Paginator = ({
  page,
  pageCount,
  total,
  onClickPrev,
  onClickNext,
  onClickStart,
  onClickEnd,
  onClickSpecificPage
}: IProps) => {
 const pages = Array.from({ length: pageCount },(_,i)=>i+1);

const pagesButton = pages.map(pg => (
  <Button key={pg} onClick={() => onClickSpecificPage(pg)}>
    {pg}
  </Button>
))

  return (
    <div className="flex justify-center flex-col items-center space-x-2">
      <p>
        page <span className="font-bold">{page} </span>
        from <span className="font-bold">{pageCount} </span>
        total <span className="font-bold">{total}</span>
      </p>
      <div className="flex space-x-5">
        <button
          type="button"
          className="bg-black text-white hover:bg-gray-900 flex p-2 justify-center items-center rounded-2xl cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500"
          disabled={page === 1}
          onClick={onClickStart}
        >
          <MoveLeft />
        </button>
        <button
          type="button"
          className="bg-black text-white hover:bg-gray-900 flex p-2 justify-center items-center rounded-2xl cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500"
          disabled={page === 1}
          onClick={onClickPrev}
        >
          <MoveLeft />
          Previous
        </button>
        {pagesButton}
        <button
          type="button"
          className="bg-black text-white hover:bg-gray-900 flex p-2 justify-center items-center rounded-2xl cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500 "
          disabled={page === pageCount}
          onClick={onClickNext}
        >
          Next
          <MoveRight />
        </button>
        <button
          type="button"
          className="bg-black text-white hover:bg-gray-900 flex p-2 justify-center items-center rounded-2xl cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500 "
          disabled={page === pageCount}
          onClick={onClickEnd}
        >
          <MoveRight />
        </button>
      </div>
    </div>
  )
}

export default Paginator
