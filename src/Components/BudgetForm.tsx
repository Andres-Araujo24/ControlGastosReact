import { useMemo, useState } from "react"
import { useBudget } from "../Hooks/useBudget"


//Ventana Principal donde se introduce el presupuesto
export const BudgetForm = () => {

    const [budget, setBudget] = useState(0) //Iniciara en 0 nuestro presupuesto

    //Utilizando nuestro hook para acceder al dispatch
    const {dispatch} = useBudget()

    //Recuperando el valor que se introduce
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(+e.target.value)
    }

    //Validando el presupuesto
    const isValid = useMemo(() => {
        return isNaN(budget) || budget <= 0 //Si da true, es que es NaN y para que tenga que ser mayor a 0
    }, [budget])


    //Para agregar presupuesto
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({type: 'add-budget', payload: {budget}})
    }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-4xl text-blue-600 font-bold text-center">Definir Presupuesto</label>
            <input type="number" id="budget" className="w-full bg-white border border-gray-200 p-2 rounded-lg" placeholder="Define tu presupuesto" name="budget" value={budget} onChange={handleChange} />
        </div>
        <input type="submit" value="Definir Presupuesto" className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full font-black uppercase text-white p-2 disabled:opacity-40" disabled={isValid} />
    </form>
  )
}
