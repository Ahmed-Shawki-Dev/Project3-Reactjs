import { yupResolver } from '@hookform/resolvers/yup'
import type { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import InputErrorMessage from '../components/InputErrorMessage'
import axiosInstance from '../config/axios.config'
import { REGISTER_FORM } from '../data'
import type { IAxiosErrorMessage, IRegisterInput } from '../interfaces'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { registerSchema } from '../validation'

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IRegisterInput>({
    resolver: yupResolver(registerSchema),
  })
  console.log(errors)
  const onSubmit: SubmitHandler<IRegisterInput> = async data => {
    setIsLoading(true)
    console.log(data)
    let res
    try {
      res = await axiosInstance.post('/auth/local/register', data)
      console.log(res)
      toast.success('Registered Successfully', {
        position: 'bottom-center',
        duration: 4000,
        style: {
          backgroundColor: 'black',
          color: 'white',
          width: 'fit-content',
        },
      })
    } catch (error) {
      console.log(error)
      const errorObj = error as AxiosError<IAxiosErrorMessage>
      toast.error(`${errorObj?.response?.data?.error.message}`, {
        position: 'bottom-center',
        duration: 4000,
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
        className="flex flex-col bg-gray-300 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-2xl text-center">Register Page</h3>
        <div className="flex flex-col space-y-4 w-full">
          {registerInputs}
          <Button
            isLoading={isLoading}
            width="w-full"
            className="bg-black hover:bg-gray-950 flex items-center justify-center disabled:bg-gray-900"
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
