import type { TextareaHTMLAttributes } from 'react'
interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}
const Textarea = ({ className, ...rest }: IProps) => {
  return (
    <textarea
      {...rest}
      style={{ fontFamily: 'Cairo, sans-serif' }}
      className={`border border-solid border-[var(--color-border)] p-2 rounded-md shadow-md h-30 bg-surface text-text w-full focus:border-[var(--color-primary)] focus:outline focus:outline-[var(--color-primary)] transition-colors ${className}`}
    ></textarea>
  )
}

export default Textarea
