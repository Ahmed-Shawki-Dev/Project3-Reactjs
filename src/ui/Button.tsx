import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  width?: 'w-full' | 'w-fit'
  className?: string
  isLoading?: boolean
  color?: 'primary' | 'secondary' | 'error' | 'success' | 'warning' | 'gray'
}

const colorClassMap: Record<string, string> = {
  primary: 'bg-primary bg-primary-hover text-on-primary',
  secondary: 'bg-secondary bg-secondary-hover text-on-secondary',
  error: 'bg-error bg-error-hover text-on-error',
  success: 'bg-success bg-success-hover text-on-success',
  warning: 'bg-warning bg-warning-hover text-on-warning',
  gray: 'bg-gray bg-gray-hover text-on-gray',
}

const Button = ({
  children,
  width = 'w-fit',
  className,
  isLoading,
  color = 'primary',
  ...rest
}: IProps) => {
  const colorClass = colorClassMap[color] || colorClassMap.primary
  return (
    <button
      disabled={isLoading}
      className={`${width} h-10 py-1 rounded-md cursor-pointer text-xl px-5 select-none disabled:cursor-not-allowed ${colorClass} transition-colors ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
