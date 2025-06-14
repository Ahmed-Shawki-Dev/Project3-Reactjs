import Button from '../ui/Button'
import Input from '../ui/Input'

const RegistratePage = () => {
  return (
    <div className="min-h-full flex justify-center items-center p-4 w-full">
      <form className="flex flex-col bg-gray-300 p-8 rounded-xl shadow-lg w-full max-w-md space-y-6">
        <h3 className="text-2xl text-center">Registrate Page</h3>
        <div className="flex flex-col space-y-4 w-full ">
          <Input width="w-full" placeholder="Username" />
          <Input width="w-full" placeholder="Email" />
          <Input width="w-full" placeholder="Password" />
          <Button width="w-full" className="bg-black hover:bg-gray-700">
            Login
          </Button>
        </div>
      </form>
    </div>
  )
}

export default RegistratePage
