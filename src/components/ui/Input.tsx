import { forwardRef, useState, type InputHTMLAttributes, type Ref } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: 'w-full' | 'w-fit'
  className?: string
}

const Input = forwardRef(
  (
    { width = 'w-full', className, type = 'text', ...rest }: IProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const [showPassword, setShowPassword] = useState(false)

    const isPassword = type === 'password'
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

    return (
      <div className={`relative ${width}`}>
        <input
          ref={ref}
          type={inputType}
          autoComplete={isPassword ? 'new-password' : 'on'}
          name={isPassword ? 'new-password' : rest.name}
          className={`border border-solid border-[var(--color-border)] p-2 rounded-md shadow-md h-12 bg-surface text-text w-full focus:border-[var(--color-primary)] focus:outline focus:outline-[var(--color-primary)] transition-colors ${className}`}
          {...rest}
        />

        {isPassword && (
          <span
            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-text-secondary"
            onClick={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
      </div>
    )
  }
)

export default Input
