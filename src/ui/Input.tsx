import type { InputHTMLAttributes } from 'react'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: 'w-full' | 'w-fit'
  className?: string
}

const Input = ({ width = 'w-full', className, ...rest }: IProps) => {
  return (
    <input className={`${width} border p-2 rounded-md shadow-md h-12 bg-white border-gray-400 ${className}`} {...rest}/>
  )
}

export default Input
