import { yupResolver } from '@hookform/resolvers/yup'
import type { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import InputErrorMessage from '../components/InputErrorMessage'
<<<<<<< HEAD
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import axiosInstance from '../config/axios.config'
import { LOGIN_FORM } from '../data'
import useTitle from '../hooks/useTitle'
import type { IAxiosErrorMessage, ILoginInput } from '../interfaces'
import { loginSchema } from '../validation'
=======
import axiosInstance from '../config/axios.config'
import { LOGIN_FORM } from '../data'
import type { IAxiosErrorMessage, ILoginInput } from '../interfaces'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { loginSchema } from '../validation'
import useTitle from '../hooks/useTitle'
>>>>>>> 4f159f7275c4f460cba007b7cfc90366eac4ddee

const LoginPage = () => {
  useTitle('Login Page')
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginInput>({
    resolver: yupResolver(loginSchema),
  })
  const onSubmit: SubmitHandler<ILoginInput> = async data => {
    setIsLoading(true)
    let res
    try {
      res = await axiosInstance.post('/auth/local', data)
      const resData = res.data
      toast.success('Logined Successfully', {
        position: 'bottom-center',
        duration: 1500,
        style: {
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          width: 'fit-content',
        },
      })
      localStorage.setItem('loggedInUser', JSON.stringify(resData))
      setTimeout(() => {
        location.replace('/')
      }, 1000)
    } catch (error) {
      const errorObj = error as AxiosError<IAxiosErrorMessage>
      toast.error(`${errorObj?.response?.data?.error.message}`, {
        position: 'bottom-center',
        duration: 1000,
        style: {
          backgroundColor: 'var(--color-surface)',
          color: 'var(--color-text)',
          width: 'fit-content',
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  /*------ Render ------*/
  const loginInputs = LOGIN_FORM.map(({ name, placeholder, type }) => (
    <div key={name}>
      <Input type={type} placeholder={placeholder} {...register(name)} />

      {errors?.[name]?.message && (
        <InputErrorMessage msg={errors[name]?.message} />
      )}
    </div>
  ))

  return (
    <div className="min-h-full flex justify-center items-center p-4 w-full">
      <form
        className="flex flex-col bg-transparent p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-2xl text-center text-text">Login Page</h3>
        <div className="flex flex-col space-y-4 w-full  ">
          {loginInputs}
          <Button
            isLoading={isLoading}
            width="w-full"
            color="primary"
            className="flex items-center justify-center disabled:bg-disabled"
          >
            {isLoading ? (
              <span className="animate-spin rounded-full h-6 w-6 border-4 border-white border-t-transparent "></span>
            ) : (
              'Login'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default LoginPage
