import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { Tab } from '@mui/material';
import { Tabs } from '@mui/material';
import ItemSearch from "./ItemSearch";

import './../scss/ItemContainer.scss'

const ItemContainer = ({listMovies, listSeries, listPeople, setId, setMedia, setTypeDetails, setShowDetails}) => {
    const [value, setValue] = useState(0);
    /* useRef para crear una referencia a cada contenedor de las listas, las guardo en otra variable aparte */
    const listRef1 = useRef(null);
    const listRef2 = useRef(null);
    const listRef3 = useRef(null);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    /* Aqui detecto cual listRef esta activo, dependiendo si el componente esta montado o no
    para luego accedo a su propiedad scrollTop y la pongo en 0. 
    Todo esto es para que al cambiar entre una lista y otra el scroll se ubique al principio*/
    useEffect(() => {
        if (listRef1.current) {
          listRef1.current.scrollTop = 0;
        }
        if (listRef2.current) {
          listRef2.current.scrollTop = 0;
        }
        if (listRef3.current) {
            listRef3.current.scrollTop = 0;
          }
    }, [value]);

    return (
        <div className="list">
                <Box  sx={{ width: '100%' }} >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider'}} >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="fullWidth"
                            >
                            <Tab value={0} label="Películas" />
                            <Tab value={1} label="Series de TV" />
                            <Tab value={2} label="Personas" />
                        </Tabs>
                    </Box>
                    {
                    value === 0 ? 
                    //El ul es el contenedor de cada lista por ende le asigno la ref diferente a cada uno
                        <ul ref={listRef1}>
                        {listMovies?.map((item, index) => {
                            return <ItemSearch
                                        key={index} 
                                        id={item.id}
                                        poster={item.poster_path}
                                        title={item.name || item.title}
                                        mediaType={item.media_type}
                                        year={item.release_date || item.first_air_date}
                                        character={item.character}
                                        setId={setId}
                                        setMedia={setMedia}
                                        setTypeDetails={setTypeDetails}
                                        setShowDetails={setShowDetails}
                                    />
                                        
                            })}
                        </ul>
                        : null
                    }
                    {
                    value === 1 ?
                        <ul ref={listRef2}>
                        {listSeries?.map((item, index) => {
                            return <ItemSearch
                                        key={index} 
                                        id={item.id}
                                        poster={item.poster_path}
                                        title={item.name || item.title}
                                        mediaType={item.media_type}
                                        year={item.release_date || item.first_air_date}
                                        character={item.character}
                                        setId={setId}
                                        setMedia={setMedia}
                                        setTypeDetails={setTypeDetails}
                                        setShowDetails={setShowDetails}
                                    />
                                        
                        })}
                        </ul>
                    : null
                    }
                    {
                    value === 2 ?
                        <ul ref={listRef3}>
                        {listPeople?.map((item, index) => {
                            return <ItemSearch
                                        key={index} 
                                        id={item.id}
                                        poster={item.profile_path}
                                        title={item.name || item.title}
                                        mediaType={item.media_type}
                                        setId={setId}
                                        setMedia={setMedia}
                                        setTypeDetails={setTypeDetails}
                                        setShowDetails={setShowDetails}
                                    />
                                        
                        })}
                        </ul>
                    : null
                    }
            </Box>
        </div>
    );
}
 
export default ItemContainer;