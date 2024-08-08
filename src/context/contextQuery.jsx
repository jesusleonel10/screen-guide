import React, {useState} from 'react';

// Creamos contexto = estado global.
const ContextQuery = React.createContext();

//Este componente permite usar el contexto para cualquier archivo
const ProviderQuery = ({children}) => {
    //Definir si mostrar o no el modal
    const [modal, setModal] = useState({
        type: 'type'
    });

    return (
        <ContextQuery.Provider
            value={
                {modal, setModal}
            }
        >
        {children} 
        </ContextQuery.Provider>
    )

}

export {ContextQuery, ProviderQuery}