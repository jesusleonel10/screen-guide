const formatDate = (dateString) => {
    let objDate = new Date(dateString + 'T00:00:00')
    return objDate.toLocaleDateString('es-VE', { year:"numeric", month:"long", day:"numeric"})
}

export default formatDate