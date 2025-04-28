import { categories } from "../Data/Categories"
import DatePicker from 'react-date-picker';
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import { useEffect, useState } from "react";
import { DraftExpense, Value } from "../Types";
import { ErrorMessage } from "./ErrorMessage";
import { useBudget } from "../Hooks/useBudget";

//Form para introducir los gastos

export const ExpenseForm = () => {
    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0, expenseName: '', category: '', date: new Date()
    }) //Conectando cada uno de los states con los campos

    const [error, setError] = useState('') //Para los errores en la validacion

    const [previousAmount, setPreviousAmount] = useState(0)

    const {dispatch, state, remainingBudget} = useBudget() //Usando nuestro custom hook que nos sincronizara nuestro Context global

    useEffect(() => {
      if(state.editingId) {
        //Para que traiga el state igual al que estoy editando para tener los campos rellenos automaticamente
        const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId)[0] 
        setExpense(editingExpense)
        setPreviousAmount(editingExpense.amount) //Para congelar ese monto
      }
    }, [state.editingId])
    

    //Para guardar los cambios en el nombre, monto...
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = e.target

        //Saber si estamos escribiendo en Amount. Retorna true or false
        const isAmountField = ['amount'].includes(name)

        //Copia del state, si name es el campo de amount, por lo que isAmountField dara true, pondra el valor en numero, sino pon el valor sin modificar.
        setExpense({
            ...expense,
            [name] : isAmountField ? +value : value
        })
    }

    //Guardando el cambio de fecha
    const handleChangeDate = (value: Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    //Validar los campos
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //Validando, Object.values es para convetir de objeto a aun arreglo
        if(Object.values(expense).includes('')) { //Si incluye al menos uno vacio de ellos, quiere decir que el usuario no los lleno
            setError('Todos los campos son obligatorios')
            return //Si la validacion no pasa, que no continue ejecutan codigo
        }
        //Validando no pasarme del limite
        if(expense.amount - previousAmount > remainingBudget) {
            setError('Fondos Insuficientes')
            return
        }

        //Actualizar o Agregar gasto
        if(state.editingId) { 
            //Como expense esta enlazado al DraftExpense y este no tiene id, debemos traerlo de algun otro, por lo que lo sacamos del state.editingId y luego que tome una copia de lo que tenemos en expense
            dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense}}})
        } else {
            dispatch({type: 'add-expense', payload: {expense}})
        }
        

        //Reiniciar el state
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
        setPreviousAmount(0)
    }

  return (
    <form className=" space-y-5" onSubmit={handleSubmit}>
        <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py2`">
            {state.editingId ? 'Actualizar Gasto' : 'Nuevo Gasto'}</legend>

        {error && <ErrorMessage>{error}</ErrorMessage> /*Si hay algo en error, renderiza Error Message */} 

        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">Nombre Gasto:</label>
            <input type="text" id="expenseName" placeholder="Agrega el Nombre" className="bg-slate-100 p-2" name="expenseName" 
                value={expense.expenseName} onChange={handleChange}/>
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="amount" className="text-xl">Cantidad:</label>
            <input type="number" id="amount" placeholder="Agrega la cantidad. Ej: 300" className="bg-slate-100 p-2" name="amount"
                value={expense.amount} onChange={handleChange}/>
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="category" className="text-xl">Categoría:</label>
            <select id="category" className="bg-slate-100 p-2" name="category" value={expense.category} onChange={handleChange}>
                <option value="">-- Seleccione --</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
        </div>

        <div className="flex flex-col gap-2">
            <label htmlFor="date" className="text-xl">Fecha Gasto:</label>
            <DatePicker className="bg-slate-100 p-2 border-0" value={expense.date} onChange={handleChangeDate}/>
        </div>

        <input type="submit" className=" bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
            value={state.editingId ? 'Actualizar Gasto' : 'Registrar Gasto'}/>
    </form>
  )
}
