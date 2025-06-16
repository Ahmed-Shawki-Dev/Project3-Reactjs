import { v4 as uuid } from 'uuid'
import type { IRegisterInputsData, ITodo } from '../interfaces'

export const todos: ITodo[] = [
  {
    id: uuid(),
    title:
      'Finish designing the homepage layout with a fully responsive style for both mobile and desktop screens',
  },

  {
    id: uuid(),
    title: 'test',
  },
  {
    id: uuid(),
    title: 'Third Todo',
  },
]

export const Register_Input: IRegisterInputsData[] = [
  {
    name: 'username',
    placeholder: 'Enter Username',
    type: 'text',
    validation: {
      required: 'Enter A Username',
      minLength: {
        value: 8,
        message: 'Enter More Than 8 Chars',
      },
    },
  },

  {
    name: 'email',
    placeholder: 'Enter Email',
    type: 'text',
    validation: {
      required: 'Enter An Email',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please Enter A Valid Email',
      },
    },
  },

  {
    name: 'password',
    placeholder: 'Enter Password',
    type: 'password',
    validation: {
      required: 'Enter A Password',
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
        message: 'Please Enter A Vaild Password',
      },
      minLength: {
        value: 8,
        message: 'Enter More Than 8 Chars',
      },
    },
  },
]
