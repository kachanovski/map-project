import React, {useEffect, useState} from 'react';
import s from './BookmarksBar.module.css'
import {Waypoint} from 'react-waypoint';
import BookmarksItem from './BookmarksItem/BookmarksItem';
import {BookmarksType} from '../../../store/BookmarksReducer';

// бокавая панель с закладками

type BookmarksBarPropsType = {
  bookmarksArray: BookmarksType
  deleteFromBookmarks: (id: string) => void
}

const BookmarksBar = (props: BookmarksBarPropsType) => {
  debugger
  const totalItems = props.bookmarksArray.length; //размер всего массива
  const pageSize = 5; //размер подгружаемого массива

  const [page, setPage] = useState<number>(1); // номер порции подгружаемых айтемов
  const [items, setItems] = useState<BookmarksType>([]); // отображаемые айтемы
  const [hasNextPage, setHasNextPage] = useState(true); // если есть следующие айтемы для отображения - true
  const [startIndex, setStartIndex] = useState<number>(0) // стартовый индекс, откуда начинает вырезаться массив
  const [error, setError] = useState<string>('') // если массив пустой, вернет ошибку

  // вырезает из массива количество страниц, равное pageSize
  const cutArr = (arr: BookmarksType, startIndex: number,): BookmarksType => {
    let cuttedArr = [...arr].splice(startIndex, pageSize);
    return cuttedArr;
  }

  useEffect(() => {
    getItems();
  }, []);

  const getItems = () => {
    if (!hasNextPage) return;

    let nextItems = cutArr(props.bookmarksArray, startIndex);
    if (nextItems) {
      if (totalItems === items.length + nextItems.length) {
        setHasNextPage(false)
      }
      setItems(items.concat(nextItems));
      setPage(page + 1);
      setStartIndex(startIndex + pageSize);
    }
    if (items.length === 0) {
      setError('There are no bookmarks :(')
    }
  }

  const loadMoreItems = () => {
    if (page > 1) {
      getItems();
    }
  }
  const deleteBookmarks = (id: string) => {
    props.deleteFromBookmarks(id);
    setItems(props.bookmarksArray.filter(b =>
      b.properties.CompanyMetaData.id !== id))
  }

  if (totalItems !== 0) {
    return (
      <div>
        <div className={s.bookmarks_bar}>
          {items.map((item, index) =>
            <BookmarksItem key={item.properties.CompanyMetaData.id}
                           number={index + 1}
                           id={item.properties.CompanyMetaData.id}
                           address={item.properties.CompanyMetaData.address}
                           url={item.properties.CompanyMetaData.url}
                           name={item.properties.CompanyMetaData.name}
                           deleteFromBookmarks={deleteBookmarks}/>)}

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
export default BookmarksBar;