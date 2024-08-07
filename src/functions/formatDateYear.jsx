const formatDateYear = (dateString) => {
    let objDate = new Date(dateString + 'T00:00:00')
    return objDate.toLocaleDateString('es-VE', { year:"numeric"})
}

export default formatDateYear