import { createContext, ReactNode, useMemo, useReducer } from "react" 
import { BudgetActions, budgetReducer, BudgetState, initialState } from "../Reducer/budget-reducer"

type BudgetContextProps = { //Para que esten sincronizados tanto el context como el provider.
    state: BudgetState;
    dispatch: React.Dispatch<BudgetActions>;
    totalExpenses: number;
    remainingBudget: number;
}
type BudgetProviderProps = {
    children: ReactNode //Como children pueden ser parrafos, etc. La forma mas facil sera ponerle ReactNode
}

//Context, es como la accion de tener el estado global.
export const BudgetContext = createContext<BudgetContextProps>(null!)//Para que desaparezca el error

//Creando Provider, es de donde vienen los datos. Los datos van a venir de nuestro reducer, sin embargo, tenemos que agregarlo, para tener de esa forma acceso al estado y a las funciones que modifican nuestro state
export const BudgetProvider = ({children}: BudgetProviderProps) => { //Children, hace referencia a los hijos de un componente.

    const [state, dispatch] = useReducer(budgetReducer, initialState)



    //APARTADO DE MOSTRAR PRESUPUESTO, DISPONIBLE Y GASTADO. NO MODIFICAN EL STATE
        //State derivados, lo bueno es que algunas funciones que cuando se actualiza el state tambien se van actualizando
        //Con useMemo para que se actualice cada que haya algun cambio en expenses. Toma dos parametros el total acumulado y el objeto actual
        const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses])
        //Monto disponible
        const remainingBudget = state.budget - totalExpenses



    return ( //Siempre retorna algo.
        //Rodeara toda la app de react y dentro sera simple tener acceso al state y dispatch. Requiere un value que recibira un objeto, y dentro de el le pasamos el state y dispatch y de esta forma ya estan conectados. AHORA LE PASAMOS OTROS MAS.
        <BudgetContext.Provider value={{state, dispatch, totalExpenses, remainingBudget}}> 
            {children}
        </BudgetContext.Provider>
    )
}

