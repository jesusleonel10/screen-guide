import ItemSearch from "./ItemSearch";
import './../scss/ItemContainer.scss'

const ItemContainer = ({dataList, setId, setMedia, setChangeDetails}) => {
    return (
        <div className="list">
            <ul>
                {
                    dataList?.map((item, index) => {
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
            </ul>
        </div>
    );
}
 
export default ItemContainer;