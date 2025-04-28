import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BudgetProvider } from './Context/BudgetContext.tsx'

//El BudgetProvider rodea nuestra app y estara disponible el estado de forma global al igual que el dispatch y las funciones del reducer
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BudgetProvider>
      <App />
    </BudgetProvider>
  </StrictMode>,
)
