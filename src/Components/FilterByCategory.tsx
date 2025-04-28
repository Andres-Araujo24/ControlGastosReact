import { categories } from "../Data/Categories"
import { useBudget } from "../Hooks/useBudget"


export const FilterByCategory = () => {

    const {dispatch} = useBudget()

    //Para filtrar dependiendo el id de la categoria que queramos, ademas le estamos pasando el id en el value como se puede ver en la etiqueta option.
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch({type: 'add-filter-category', payload: {id: e.target.value}})
    }

  return (
    <div className=" bg-white shadow-lg rounded-lg mt-10 p-10">
        <form>
            <div className="flex flex-col md:flex-row md:items-center gap-5">
                <label htmlFor="category">Filtrar Gastos</label>
                <select id="category" className=" bg-slate-100 p-3 flex-1 rounded" 
                    onChange={handleChange}
                >
                    <option value="">-- Todas las Categorias --</option>
                    {categories.map(category => (
                        <option value={category.id} key={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
        </form>
    </div>
  )
}
