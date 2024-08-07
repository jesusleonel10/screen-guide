const Provider = ({logo, classname}) => {
    return (
        <>
            {
            logo ?
            <div className={`${classname} card_provider`}>
                    <img src={`https://image.tmdb.org/t/p/original${logo}`} alt="Logo de la plataforma de streaming" className="card_provider__logo" />
            </div>
            :
            <div className="no_providers">
                <i className="fa-solid fa-circle-exclamation"></i>
                <span>No Disponible en plataformas digitales aún</span>
            </div>
            }
        </>
    );
}
 
export default Provider;