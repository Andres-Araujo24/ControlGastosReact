import { buildStyles, CircularProgressbar } from "react-circular-progressbar"
import { useBudget } from "../Hooks/useBudget"
import { AmountDisplay } from "./AmountDisplay"
import "react-circular-progressbar/dist/styles.css"

//Ventana principal del grafico cuando ponemos el presupuesto
export const BudgetTracker = () => {

  const { state, totalExpenses, remainingBudget, dispatch } = useBudget()

  //Porcentaje para la grafica. toFixed, para que no de mas de 2 decimales
  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar 
          value={percentage}
          styles={buildStyles({
            pathColor: percentage === 100 ? '#DC2626' : '#3B82F6',
            trailColor: '#F5F5F5',
            textSize: 8,
            textColor: percentage === 100 ? '#DC2626' : '#3B82F6'
          })}
          text={`${percentage}% Gastado`} 
        />
      </div>

      <div className="flex flex-col justify-center items-center gap-8">
        <button type="button" className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg cursor-pointer"
          onClick={() => dispatch({type: 'reset-app'})}
        >
          Resetear App
        </button>
        <AmountDisplay label="Presupuesto" amount={state.budget} />
        <AmountDisplay label="Disponible" amount={remainingBudget} />
        <AmountDisplay label="Gastado" amount={totalExpenses} />
      </div>
    </div>
  )
}
