//Formato al dinero
export const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD'
    }).format(amount)
}


//Formato a la fecha
export const formatDate = (dateStr: string) : string => { //Diciendo que retornara un string
    const dateObj = new Date(dateStr) //Pasando el string como fecha
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return new Intl.DateTimeFormat('en-US', options).format(dateObj)
} 