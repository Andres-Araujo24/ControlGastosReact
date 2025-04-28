import { v4 as uuidv4 } from "uuid"
import { Category, DraftExpense, Expense } from "../Types"

export type BudgetActions = 
    {type: 'add-budget', payload: {budget: number}} |
    {type: 'show-modal'} |//No tomara payload porque solo cambiare de false a true
    {type: 'close-modal'} |
    {type: 'add-expense', payload: {expense: DraftExpense}} | //No tendra id, lo generaremos en el reducer
    {type: 'remove-expense', payload: {id: Expense['id']}} |//Lo que sea que tenga Expense en su campo id, queremos utilizar el mismo type
    {type: 'edite-expense', payload: {id: Expense['id']}} |//Editar un gasto mediante id
    {type: 'update-expense', payload: {expense: Expense}} |//Esta accion de ejecutara cuando se ejecute la de editar
    {type: 'reset-app'} |//Resetear la app
    {type: 'add-filter-category', payload: {id: Category['id']}} //Filtrar por categorias de gastos

export type BudgetState = {
    budget: number,
    modal: boolean,
    expenses: Expense[],
    editingId: Expense['id'],
    currentCategory: Category['id']
}

//Para el localStorage
const initialBudget = () : number => {
    const localStorageBudget = localStorage.getItem('budget')
    return localStorageBudget ? +localStorageBudget : 0 //En caso de que tenga algo que lo retorne convertido a numero sino retorna 0
}
const localStorageExpenses = () : Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses')
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : []
}

export const initialState: BudgetState =  {
    budget: initialBudget(),
    modal: false,
    expenses: localStorageExpenses(),
    editingId: '',
    currentCategory: ''
}

const createExpense = (draftExpense: DraftExpense) : Expense => { //Diciendole que tiene que retornar un Expense
    //Con uuid, para asignarle un id unico y que me retorne un arreglo Expense con id
    return {
        ...draftExpense,
        id: uuidv4()
    }
}


export const budgetReducer = (
    state: BudgetState = initialState,
    action: BudgetActions
) => {
    //Agragando Presupuesto
    if(action.type === 'add-budget') {
        return {
            ...state,
            budget: action.payload.budget //Lo colocamos directamente porque ya lo validamos en su componente
        }
    }

    //Modal true, para que muestre la barra para agregar algun gasto o ingreso
    if(action.type === 'show-modal') {
        return {
            ...state,
            modal: true
        }
    }

    //Para cerrar el modal
    if(action.type === 'close-modal') {
        return {
            ...state,
            modal: false,
            editingId: '' //Si no se finaliza la actualizacion, retorne el modal vacio luego cuando quiera agregar un nuevo gasto
        }
    }

    //Agregando Gasto
    if(action.type === 'add-expense') {
        const expense = createExpense(action.payload.expense) //Recibira algo y cuando termine el proceso lo retornara en expense.
        return {
            ...state,
            expenses: [...state.expenses, expense], //Hacemos copia y luego agregue el gasto
            modal: false //Para que desaparezca el modal luego de ingresar un gasto
        }
    }

    //Eliminando Gasto
    if(action.type === 'remove-expense') { 
        return {
            ...state,
            expenses: state.expenses.filter(expense => expense.id !== action.payload.id) //Trae todos los diferentes al id proporcionado
        }
    }

    //Editando gasto by id
    if(action.type === 'edite-expense') {
        return {
            ...state,
            editingId: action.payload.id, //El gasto que vamos a editar
            modal: true
        }
    }

    //Actualizando gasto que estaba en edicion
    if(action.type === 'update-expense') {
        return {
            ...state,
            expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? 
                action.payload.expense : expense), //Creando nuevo arreglo, e iterando si el gasto actual es igual al del payload, entonces vamos a reescribir el gasto y si no es igual retornamos el gasto el cual estamos editando.
            modal: false,
            editingId: '' //Para cuando quiera agregar un gasto, no se quede activo y regrese el modal vacio.
        }
    }

    //Reseteando la app
    if(action.type === 'reset-app') {
        return {
            ...state,
            budget: 0,
            expenses: []
        }
    }

    //Filtrando por categorias de gastos
    if(action.type === 'add-filter-category') {
        return {
            ...state,
            currentCategory: action.payload.id
        }
    }

    return state
}