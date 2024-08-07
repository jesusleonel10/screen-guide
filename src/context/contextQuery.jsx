import React, {useState} from 'react';

// Creamos contexto = estado global.
const ContextQuery = React.createContext();

//Este componente permite usar el contexto para cualquier archivo
const ProviderQuery = ({children}) => {
    //Definir el ID de la consulta 
    const [idQuery, setIdQuery] = useState('');
    //Definir si es una pelicula o serie
    const [mediaType, setMediaType] = useState('');
    //Definir si mostrar o no el modal
    const [modal, setModal] = useState({
        type: 'type'
    });

    return (
        <ContextQuery.Provider
            value={
                {mediaType, 
                setMediaType, 
                modal, 
                setModal, 
                idQuery, 
                setIdQuery,
                }
            }
        >
        {children} 
        </ContextQuery.Provider>
    )

}

export {ContextQuery, ProviderQuery}