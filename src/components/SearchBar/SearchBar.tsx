import React, {useState, useEffect} from 'react';
import {PointType} from '../../App';
import s from './SearchBar.module.css'
import SearchItem from './SearchItem/SearchItem';
import {Waypoint} from 'react-waypoint';

// бокавая панель с результатами поиска

type SearchBarPropsType = {
    points: Array<PointType>
}

const SearchBar = (props: SearchBarPropsType) => {

    const totalItems = props.points.length; //размер всего массива
    const pageSize = 5; //размер подгружаемого массива

    const [page, setPage] = useState<number>(1); // номер порции подгружаемых айтемов
    const [items, setItems] = useState<Array<PointType>>([]); // отображаемые айтемы
    const [hasNextPage, setHasNextPage] = useState(true); // если есть следующие айтемы для отображения - true
    const [startIndex, setStartIndex] = useState<number>(0) // стартовый индекс, откуда начинает вырезаться массив
    const [error, setError] = useState<string>("") // если массив пустой, вернет ошибку

    // вырезает из массива количество страниц, равное pageSize
    const cutArr = (arr: Array<PointType>, startIndex: number,): Array<PointType> => {
        let cuttedArr = [...arr].splice(startIndex, pageSize);
        return cuttedArr;
    }

    useEffect(() => {
        getItems();
    }, []);

    const getItems = () => {
        if (!hasNextPage) return;

        let nextItems = cutArr(props.points, startIndex);
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

    const searchItems = items.map((item, index) =>
        <SearchItem key={index} number={index + 1} name={item.title}/>);
    if (items.length !== 0) {
        return (
            <div>
                <div className={s.search_bar}>
                    {searchItems}

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