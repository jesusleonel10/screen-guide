const formatTime = (minutos) => {
    const horas = Math.floor(minutos / 60)
    const minutos_restantes = minutos - (horas * 60)
    let h = ''
    horas > 1 ? h = 'horas' : h = 'hora'
    
    return (`${horas} ${h}, ${minutos_restantes} minutos`)
}

export default formatTime