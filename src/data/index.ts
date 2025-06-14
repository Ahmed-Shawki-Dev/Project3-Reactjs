import { v4 as uuid } from 'uuid';
import type { ITodo } from '../interfaces';

export const todos:ITodo[]=[
  {
    id:uuid(),
    title:"First Todo"
  },
  {
    id:uuid(),
    title:"Second Todo"
  },
  {
    id:uuid(),
    title:"Third Todo"
  }
]



