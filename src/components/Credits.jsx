import {Fragment} from 'react'
import Loading from './Loading';
import ScrollingWidget from './ScrollingWidget';
import Profile from './Profile';
import useFetchData from '../hooks/useFetchData';

import './../scss/Credits.scss'

const Credits = ({idQuery, mediatype}) => {
    //Custom hook para hacer la consulta a la API
    const { data, loading } = useFetchData(`https://api.themoviedb.org/3/${mediatype}/${idQuery}/${mediatype === 'tv' ? 'aggregate_credits' : 'credits'}?language=es-MX`, mediatype)

    return (
        <>
            <div className="credits">
                {
                //Muestro animacion de carga mientras sea true
                loading ?
                    <Loading />
                //Al pasar a false termina la carga y mostramos el componente
                    :
                    <Fragment>
                        <ScrollingWidget
                            showHeader={true}
                            textHeader='Reparto'
                            idWidget='cast'
                        >
                        {
                            mediatype === 'movie' ?
                            data?.cast?.slice(0, 12)?.map((item, index) => {
                                return <Profile
                                    key={index}
                                    photo={item.profile_path}
                                    name={item.name}
                                    character={item.character}
                                />
                            })
                            :
                            data?.cast?.slice(0, 12)?.map((item, index) => {
                                return <Profile
                                    key={index}
                                    photo={item.profile_path}
                                    name={item.name}
                                    character={item.roles.map((c) => c.character)}
                                />
                            })
                        }
                        </ScrollingWidget>
                        <ScrollingWidget
                            showHeader={true}
                            textHeader='Directores y Escritores'
                            idWidget='director-writers'
                        >
                        {
                            mediatype === 'tv' ?
                            data?.crew?.filter((item) => item.jobs.some((element) => element.job === 'Director' || element.job === 'Writer'))
                            .slice(0, 12)
                            .map((item, index) => {
                                return <Profile
                                    key={index}
                                    photo={item.profile_path}
                                    name={item.name}
                                    job={item.jobs.map((i) => i.job)}
                                />
                            })
                            :
                            data?.crew?.filter((item) => item.job === 'Director' || item.job === 'Writer')
                            .slice(0, 12)
                            .map((item, index) => {
                                return <Profile
                                    key={index}
                                    photo={item.profile_path}
                                    name={item.name}
                                    job={item.job}
                                />
                            })
                        }
                        </ScrollingWidget>
                    </Fragment>
                }
            </div>
        </>
    );
}
 
export default Credits;