const formatLocation = (rute) => {
    if(rute === '/movies') {
        return 'movie'
    } else if(rute === '/tv-shows') {
        return 'tv'
    }
}

export default formatLocation