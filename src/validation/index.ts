import * as yup from 'yup'
import type { ITodo } from '../interfaces'

export const registerSchema = yup.object({
  username: yup.string().required('Username is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
})

export const loginSchema = yup.object({
  identifier: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
})

export const EditSchema = (todo: ITodo) => {
  const errors: { title: string; description: string } = {
    title: '',
    description: '',
  }

  if (!todo.title.trim() || todo.title.length < 4 || todo.title.length > 80) {
    errors.title = 'Enter A Valid Title'
  }

  if (
    !todo.description ||
    !todo.description.trim() ||
    todo.description.length < 10 ||
    todo.description.length > 200
  ) {
    errors.description = 'Enter A Valid Description'
  }

  return errors
}
<<<<<<< HEAD
export const AddSchema = (todo: ITodo) => {
  const errors: { title: string; description: string } = {
    title: '',
    description: '',
  }

  if (!todo.title.trim() || todo.title.length < 4 || todo.title.length > 80) {
    errors.title = 'Enter A Valid Title'
  }

  if (
    !todo.description ||
    !todo.description.trim() ||
    todo.description.length < 10 ||
    todo.description.length > 200
  ) {
    errors.description = 'Enter A Valid Description'
  }

  return errors
}
=======
>>>>>>> 4f159f7275c4f460cba007b7cfc90366eac4ddee
