
const date = ()=>{
    const date = new Date();
    const formatoFecha = date.getDay()+1 + '/' + date.getMonth() + '/' + date.getFullYear() + '  Hora:' + date.getHours() + ':' + date.getMinutes();
    return formatoFecha  
}

export default date;