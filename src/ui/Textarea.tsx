import type { TextareaHTMLAttributes } from 'react'
interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}
const Textarea = ({ className, ...rest }: IProps) => {
  return (
    <textarea
      {...rest}
      style={{ fontFamily: 'Cairo, sans-serif' }}
      className={`border p-2 rounded-md shadow-md h-30 bg-white border-gray-400 w-full focus:border-indigo-500 focus:outline focus:outline-indigo-500 ${className}`}
    ></textarea>
  )
}


export default Textarea
