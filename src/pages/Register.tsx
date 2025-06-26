import { yupResolver } from '@hookform/resolvers/yup'
import type { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { toast } from 'react-hot-toast'
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom'
import InputErrorMessage from '../components/InputErrorMessage'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import axiosInstance from '../config/axios.config'
import { REGISTER_FORM } from '../data'
import useTitle from '../hooks/useTitle'
import type { IAxiosErrorMessage, IRegisterInput } from '../interfaces'
import { registerSchema } from '../validation'
=======
import InputErrorMessage from '../components/InputErrorMessage'
import axiosInstance from '../config/axios.config'
import { REGISTER_FORM } from '../data'
import type { IAxiosErrorMessage, IRegisterInput } from '../interfaces'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { registerSchema } from '../validation'
import { useNavigate } from 'react-router-dom'
import useTitle from '../hooks/useTitle'
>>>>>>> 4f159f7275c4f460cba007b7cfc90366eac4ddee

const RegisterPage = () => {
  useTitle('Register Page')
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IRegisterInput>({
    resolver: yupResolver(registerSchema),
  })
  const onSubmit: SubmitHandler<IRegisterInput> = async data => {
    setIsLoading(true)
    let res
    try {
      res = await axiosInstance.post('/auth/local/register', data)
      toast.success('Registered Successfully', {
        position: 'bottom-center',
        duration: 1500,
        style: {
          backgroundColor: 'black',
          color: 'white',
          width: 'fit-content',
        },
      })
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (error) {
      const errorObj = error as AxiosError<IAxiosErrorMessage>
      toast.error(`${errorObj?.response?.data?.error.message}`, {
        position: 'bottom-center',
        duration: 1500,
        style: {
          backgroundColor: 'black',
          color: 'white',
          width: 'fit-content',
        },
      })
    } finally {
      setIsLoading(false)
      if (res?.data) reset()
    }
  }

  /*------ Handler ------*/

  /*------ Render ------*/
  const registerInputs = REGISTER_FORM.map(({ name, placeholder, type }) => (
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
        className="flex flex-col bg-transparent p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-2xl text-center text-text">Register Page</h3>
        <div className="flex flex-col space-y-4 w-full">
          {registerInputs}
          <Button
            isLoading={isLoading}
            width="w-full"
            color="primary"
            className="flex items-center justify-center disabled:bg-disabled"
          >
            {isLoading ? (
              <span className="animate-spin rounded-full h-6 w-6 border-4 border-white border-t-transparent "></span>
            ) : (
              'Register'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RegisterPage
