import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  width?: 'w-full' | 'w-fit'
  className?: string
}

const Button = ({ children, width = 'w-fit',className, ...rest }: IProps) => {
  return (
    <button
      className={`${width}  h-10 py-1 rounded-md  hover:bg-blue-500 cursor-pointer text-white text-xl px-5 select-none ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
