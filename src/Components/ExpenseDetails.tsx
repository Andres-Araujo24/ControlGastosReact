import { useMemo } from "react"
import { formatDate } from "../Helpers"
import { Expense } from "../Types"
import { AmountDisplay } from "./AmountDisplay"
import { categories } from "../Data/Categories"
import {
    LeadingActions,
    SwipeableList, //Rodea todo el contenido. Rodea todo el componente
    SwipeableListItem, //Rodea las acciones y configuraciones. Rodea todo el componente. Prop maxSwipe, es lo que se recorrera para mostrar las acciones.
    SwipeAction,
    TrailingActions,
} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { useBudget } from "../Hooks/useBudget"


type ExpenseDetailsProps = {
    expense: Expense
}

//Tiene los detalles de cada gasto introducido. Componente que usaremos para iterar y mostrar cada gasto
export const ExpenseDetails = ({ expense }: ExpenseDetailsProps) => {
    //Nos traemos la informacion de ese arreglo. Ej: id 2, nos traemos todo del id 2 de categories, su name y su icon.
    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])
    const {dispatch} = useBudget()

    //Para modificar y actualizar gastos. Con ayuda de libreria de react-swipeable-list
    const leadingActions = () => (
        //El LeadingActions, es para moverlo de izquierda a derecha
        <LeadingActions>
            <SwipeAction onClick={() => dispatch({type: 'edite-expense', payload: {id: expense.id}})}>
                Actualizar
            </SwipeAction>
        </LeadingActions> //El SwipeAction, son las acciones que se dispararan. Es como un boton
    );

    //Para eliminar gasto
    const trailingActions = () => (
        //El TrailingActions, para moverlo de derecha a izquierda
        <TrailingActions>
            <SwipeAction
                destructive={true}
                onClick={() => dispatch({type: 'remove-expense', payload: {id: expense.id}})}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    );

    return (
        <SwipeableList >
            <SwipeableListItem maxSwipe={1} leadingActions={leadingActions()} trailingActions={trailingActions()}>
                <div className="bg-white shadow-2xl p-5 w-full border-b border-gray-200 flex gap-5 items-center">
                    <div>
                        <img className="w-20 "
                            src={`/icono_${categoryInfo.icon}.svg`} alt={`Icono de ${categoryInfo.icon}`} />
                    </div>

                    <div className="flex-1 space-y-2">
                        <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                        <p>{expense.expenseName}</p>
                        <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
                    </div>

                    <AmountDisplay amount={expense.amount} />
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
