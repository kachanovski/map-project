import React, {useEffect, useState} from 'react';
import s from './SearchBar.module.css'
import SearchItem from './SearchItem';
import {Waypoint} from 'react-waypoint';
import {FeaturesType} from "../store/MapReducer";

// бокавая панель с результатами поиска

type SearchBarPropsType = {
    resultArray: Array<FeaturesType>
}

const SearchBar = (props: SearchBarPropsType) => {

    const totalItems = props.resultArray.length; //размер всего массива
    const pageSize = 5; //размер подгружаемого массива

    const [page, setPage] = useState<number>(1); // номер порции подгружаемых айтемов
    const [items, setItems] = useState<Array<FeaturesType>>([]); // отображаемые айтемы
    const [hasNextPage, setHasNextPage] = useState(true); // если есть следующие айтемы для отображения - true
    const [startIndex, setStartIndex] = useState<number>(0) // стартовый индекс, откуда начинает вырезаться массив
    const [error, setError] = useState<string>("") // если массив пустой, вернет ошибку

    // вырезает из массива количество страниц, равное pageSize
    const cutArr = (arr: Array<FeaturesType>, startIndex: number,): Array<FeaturesType> => {
        let cuttedArr = [...arr].splice(startIndex, pageSize);
        return cuttedArr;
    }

    useEffect(() => {
        getItems();
    }, []);

    const getItems = () => {
        if (!hasNextPage) return;

        let nextItems = cutArr(props.resultArray, startIndex);
        if (nextItems) {
            if (totalItems === items.length + nextItems.length) {
                setHasNextPage(false)
            }
            setItems(items.concat(nextItems));
            setPage(page + 1);
            setStartIndex(startIndex + pageSize);
        }
        if (items.length === 0) {
            setError("Ничего не нашел :(")
        }
        ;

    }

    const loadMoreItems = () => {
        if (page > 1) {
            getItems();
        }
    }

    if (items.length !== 0) {
        return (
            <div>
                <div className={s.search_bar}>
                    {items.map((item, index) =>
                        <SearchItem key={index}
                                    number={index + 1}
                                    coordinate={item.geometry.coordinates}
                                    address={item.properties.CompanyMetaData.address}
                                    url={item.properties.CompanyMetaData.url}
                                    name={item.properties.CompanyMetaData.name}/>)}

                    {hasNextPage && (
                        <Waypoint onEnter={loadMoreItems}>
                            <div>Loading...</div>
                        </Waypoint>
                    )
                    }
                </div>
            </div>
        )
    } else {
        return <h2>{error}</h2>
    }
}
export default SearchBar;