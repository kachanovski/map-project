import React from 'react';
import s from './SearchItem.module.css'
import star from '../../../assets/rating-icon.svg';

// элемент внутри панели поиска

type SearchItemPropsType = {
    number?: number
    name?: string
    address?: string
    url?: string
    setBookmarks: (title: string) => void
    savedInBookmarks: Array<string>
    id: string,
    coordinate: Array<number>
}

const SearchItem = (props: SearchItemPropsType) => {
    return (
        <div className={s.search_item}>
            <h4 className={s.title}>---{props.number}--- {props.name}</h4>
            <button className={s.save_btn}
                    disabled={props.savedInBookmarks.some(b => b === props.id)}
                    onClick={() => props.setBookmarks(props.id)}>Save
            </button>
            <div className={s.address}>{props.address}</div>
            <div className={s.address}>{props.url}</div>
            <div className={s.rating}>(5)
                <img className={s.rating_star} src={star} alt="Rating"/>
                <img className={s.rating_star} src={star} alt="Rating"/>
                <img className={s.rating_star} src={star} alt="Rating"/>
                <img className={s.rating_star} src={star} alt="Rating"/>
                <img className={s.rating_star} src={star} alt="Rating"/>
            </div>
        </div>
    )
}

export default SearchItem;