import { MoveLeft, MoveRight } from 'lucide-react'

interface IProps {
  page: number
  pageCount: number
  total:number
  onClickPrev: () => void
  onClickNext: () => void
  onClickEnd: () => void
  onClickStart: () => void
}

const Paginator = ({
  page,
  pageCount,
  total,
  onClickPrev,
  onClickNext,
  onClickStart,
  onClickEnd
}: IProps) => {
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
