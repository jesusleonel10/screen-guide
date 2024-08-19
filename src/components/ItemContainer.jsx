import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ItemSearch from "./ItemSearch";

import './../scss/ItemContainer.scss'

const ItemContainer = ({listMovies, listSeries, setId, setMedia, setChangeDetails}) => {
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className="list">
            <ul>
                <Box  sx={{ width: '100%' }} >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider'}} >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            variant="fullWidth"
                        >
                            <Tab value="1" label="Películas" />
                            <Tab value="2" label="Series de TV" />
                        </Tabs>
                    </Box>
                    {
                     value === '1' && listMovies?.map((item, index) => {
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
                                    setChangeDetails={setChangeDetails}
                                />
                        })
                    }
                    {
                    value === '2' && listSeries?.map((item, index) => {
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
                                    setChangeDetails={setChangeDetails}
                                />
                        })
                    }
                </Box>
                
                    





{/* 
                {
                    dataList?.filter((item) => item.media_type === 'movie')
                    .map((item, index) => {
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
                                setChangeDetails={setChangeDetails}
                            />
                    })
                } */}
            </ul>
        </div>
    );
}
 
export default ItemContainer;