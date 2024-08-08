import { useState } from "react";
import useFetchData from "../hooks/useFetchData";
import Search from "./Search";
import Slider from "./Slider";


const Main = () => {
    //Estado timewindows para hacer la consulta de tendencias entre dia y semana
    const [timeWindow, setTimeWindow] = useState('day');
    const { data } = useFetchData(`https://api.themoviedb.org/3/trending/all/${timeWindow}?&language=es-MX`, timeWindow)

    return (
        <>
            <Search 
              trending={data.results}

            />
            <Slider 
                trending={data.results}
                timeWindow={timeWindow}
                setTimeWindow={setTimeWindow}
            />
            
        </>
    );
}
 
export default Main;