import React from 'react';
import s from './SearchItem.module.css'
import star from '../assets/rating-icon.svg';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../store/store";
import {centerPositionAC, FeaturesType, setZoomAC} from '../store/MapReducer';

// элемент внутри панели поиска

type SearchItemPropsType = {
    number?: number
    name?: string
    address?: string
    url?: string
    coordinate: Array<number>
}

const SearchItem = (props: SearchItemPropsType) => {

    const dispatch = useDispatch()

    const handleItem = () => {
        dispatch(centerPositionAC([props.coordinate[1], props.coordinate[0]]))
        dispatch(setZoomAC(15))
    }

    return (
        <div className={s.search_item}>
            <h4 onClick={handleItem} className={s.title}>{props.number}. {props.name}</h4>
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