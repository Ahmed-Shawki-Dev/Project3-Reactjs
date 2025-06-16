export interface ITodo {
  id?: string | undefined
  title: string
}

export type TRegiserInputNames = 'username' | 'email' | 'password'

export interface IFormInput {
  username: string
  email: string
  password: string
}

export interface IRegisterInputsData {
  type: string
  placeholder: string
  name: TRegiserInputNames

  validation: {
    required?: string
    pattern?: {
      value: RegExp
      message: string
    }
    minLength?: {
      value: number
      message: string
    }
  }
}
