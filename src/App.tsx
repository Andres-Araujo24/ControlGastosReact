import {  useEffect, useMemo } from "react"
import { BudgetForm } from "./Components/BudgetForm"
import { useBudget } from "./Hooks/useBudget"
import { BudgetTracker } from "./Components/BudgetTracker"
import ExpenseModal from "./Components/ExpenseModal"
import { ExpenseList } from "./Components/ExpenseList"
import { FilterByCategory } from "./Components/FilterByCategory"



function App() {
  //Para poder utilizar el Context y todo lo que se retorna, lo haremos facil por medio de un custom hook


  //Accediendo al state
  const {state} = useBudget()

  //Para validar presupuesto es mayor a 0
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]) //Cuando haya cambios en la dep se ejecutara la funcion

  //Para guardar localStorage
  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString()) //.toString, para que lo convierta a string
    localStorage.setItem('expenses', JSON.stringify(state.expenses)) //Como un Arreglo no se puede guardar en storage, solo string
  }, [state]) //Para ejecutar por cada cambio en el state, ya sea de presupuesto o gastos.
  

  return (
    <>
      <header className=" bg-blue-600 py-8 max-h-72">
        <h1 className=" uppercase text-center font-black text-4xl text-white">Planificacdor de Gastos</h1>
      </header>

      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? <BudgetTracker/> : <BudgetForm/>}
      </div>

      {isValidBudget && ( //Un ternario pero cuando solamente se valora como true la condicion(isValidBudget)
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal/> 
        </main>
      )}
    </>
  )
} 

export default App
