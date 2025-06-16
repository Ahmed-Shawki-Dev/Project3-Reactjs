import InputErrorMessage from '../components/InputErrorMessage'
import { Register_Input } from '../data'
import type { IFormInput } from '../interfaces'
import Button from '../ui/Button'
import Input from '../ui/Input'
import { useForm, type SubmitHandler } from 'react-hook-form'

const RegiserPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>()
  console.log(errors)
  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log(data)
    reset()
  }

  /*------ Handler ------*/

  /*------ Render ------*/
  const registerInputs = Register_Input.map(
    ({ name, placeholder, type, validation }, idx) => (
      <div>
        <Input
          key={idx}
          type={type}
          placeholder={placeholder}
          {...register(name, validation)}
        />

        {errors?.[name]?.message && (
          <InputErrorMessage msg={errors[name]?.message} />
        )}
      </div>
    )
  )

  return (
    <div className="min-h-full flex justify-center items-center p-4 w-full">
      <form
        className="flex flex-col bg-gray-300 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3 className="text-2xl text-center">Regiser Page</h3>
        <div className="flex flex-col space-y-4 w-full ">
          {registerInputs}
          <Button width="w-full" className="bg-black hover:bg-gray-700">
            Regiser
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RegiserPage
