import { v4 as uuid } from 'uuid'
import type { ILoginInputsData, IRegisterInputsData, ITodo } from '../interfaces'

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
  {
    id: uuid(),
    title: 'Fourth Todo',
  },
]

export const REGISTER_FORM: IRegisterInputsData[] = [
  {
    name: 'username',
    placeholder: 'Enter Username',
    type: 'text',
  },

  {
    name: 'email',
    placeholder: 'Enter Email',
    type: 'text',
  },

  {
    name: 'password',
    placeholder: 'Enter Password',
    type: 'password',
  },
]






export const LOGIN_FORM: ILoginInputsData[] = [
  {
    name: 'identifier',
    placeholder: 'Enter Email',
    type: 'text',
  },

  {
    name: 'password',
    placeholder: 'Enter Password',
    type: 'password',
  },
]



export const navItems = [
  { path: '/', label: 'Home' },
  { path: '/regiser', label: 'Register' },
  { path: '/login', label: 'Login' },
]

