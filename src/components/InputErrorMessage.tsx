interface IProps {
  msg?: string
}

const InputErrorMessage = ({ msg }: IProps) => {
  return msg ? (
    <span className="text-red-700 text-sm px-2  pt-2">{msg}</span>
  ) : null
}

export default InputErrorMessage
