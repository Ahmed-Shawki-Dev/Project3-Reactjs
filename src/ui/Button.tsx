import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  width?: 'w-full' | 'w-fit'
  className?: string
  isLoading?:boolean
}

const Button = ({ children, width = 'w-fit',className,isLoading, ...rest }: IProps) => {
  return (
    <button
    disabled={isLoading}
      className={`${width}  h-10 py-1 rounded-md  hover:bg-blue-500 cursor-pointer text-white text-xl px-5 select-none disabled:cursor-not-allowed ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
