import type { TextareaHTMLAttributes } from 'react'
interface IProps {
  className?: string
  rest?: TextareaHTMLAttributes<HTMLTextAreaElement>
}
const Textarea = ({ className, ...rest }: IProps) => {
  return (
    <textarea
      name=""
      id=""
      {...rest}
      style={{ fontFamily: 'Cairo, sans-serif' }}
      className={`${className} p-5 border-2 border-gray-300 rounded-md shadow-sm focus:border-[#7285C5] focus:ring-1 focus:ring-[#7285C5] focus:outline-none`}
    ></textarea>
  )
}

export default Textarea
