import { useContext } from "react"
import { BudgetContext } from "../Context/BudgetContext"

//Hook para manejar el uso del context
export const useBudget = () => {
    const context = useContext(BudgetContext)
    if(!context) {
        throw new Error('useBudget must be used within a BudgetProvider');
    }
    return context
    //De esta forma podemos mandar a llamar este hook y no tener que estar llamando useContext
}