import { useMemo } from "react"
import { useBudget } from "../Hooks/useBudget"
import { ExpenseDetails } from "./ExpenseDetails"

//Para mostrar los gastos una vez suministrados
export const ExpenseList = () => {
    //Extrayendo el state porque solo queremos visualizar los gastos
    const { state } = useBudget()

    //Si hay una categoria seleccionada, vamos a filtrar los expenses de la misma categoria si son iguales, si no hay nada, retornamos todos los gastos
    const filteredExpenses = state.currentCategory ? state.expenses.filter(
        expense => expense.category === state.currentCategory) 
    : state.expenses

    //Mostrar gastos si hay (mayor a 0). useMemo para que se ejecute solo cuando hayan cambios en filtrar gastos.
    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])

    return (
        <div className="bg-white shadow-lg rounded-lg mt-10 p-10">
            {isEmpty ? <p className="text-gray-600 text-2xl font-bold">No Hay Gastos</p> : ( //Si no esta vacio ejecuto lo que abajo
                <>
                    <p className="text-gray-600 text-2xl font-bold my-5">Listado de Gastos</p>
                    {filteredExpenses.map(expense => (
                        <ExpenseDetails key={expense.id} expense={expense} />
                    ))}
                </>
            )}
        </div>
    )
}
