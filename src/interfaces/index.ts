import type { AxiosRequestConfig } from "axios"

export interface ITodo {
  id?:number
  documentId?: string 
  title: string
  description?: string
}

export type TRegiserInputNames = 'username' | 'email' | 'password'
export type TLoginInputNames = 'identifier' | 'password'

export interface IRegisterInput {
  username: string
  email: string
  password: string
}

export interface ILoginInput {
  identifier: string
  password: string
}

export interface IRegisterInputsData {
  type: string
  placeholder: string
  name: TRegiserInputNames

  validation?: {
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
export interface ILoginInputsData {
  type: string
  placeholder: string
  name: TLoginInputNames

  validation?: {
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

export interface IAxiosErrorMessage {
  error: {
    message: string
  }
}

export interface IAuthenticatedQuery {
  queryKey: string[]
  url: string
  config?: AxiosRequestConfig
}

