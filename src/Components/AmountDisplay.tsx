import { formatCurrency } from "../Helpers"

type AmountDisplayProps = {
    label?: string; //Con el signo decimos es que este valor sera opcional
    amount: number
}

//Darle formato de dinero a los montos
export const AmountDisplay = ({label, amount}: AmountDisplayProps) => {
  return (
    <p className="text-2xl text-blue-600 font-bold">{label && `${label}: `}
        <span className="font-black text-black">{formatCurrency(amount)}</span>
    </p>
  )
}
