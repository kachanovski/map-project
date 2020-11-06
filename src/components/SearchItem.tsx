import React from 'react';
import s from './SearchItem.module.css'
import star from '../assets/rating-icon.svg';

// элемент внутри панели поиска

type SearchItemPropsType = {
    number?: number
    name?: string
    address?: string
    url?: string
}

const SearchItem = (props: SearchItemPropsType) => {
    return (
        <div className={s.search_item}>
            <h4 className={s.title}>---{props.number}--- {props.name}</h4>
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