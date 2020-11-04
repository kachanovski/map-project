import React, {useEffect, useState} from "react";
import {usePosition} from 'use-position';
import s from './App.module.css'
import {GeolocationControl, Map, Placemark, YMaps} from "react-yandex-maps";
import {useDispatch, useSelector} from "react-redux";
import {centerPositionAC, FeaturesType, getPlacemarksTC, myLocationAC} from "./store/MapReducer";
import {StateType} from "./store/store";


const MapApp = () => {

    const [hideResults, setHideResults] = useState(false)
    const dispatch = useDispatch()
    const coordinates = useSelector<StateType, Array<FeaturesType>>(state => state.map.feature)
    const myLocation = useSelector<StateType, Array<number>>(state => state.map.myLocation)
    const center = useSelector<StateType, Array<number>>(state => state.map.center)
    const zoom = useSelector<StateType, number>(state => state.map.zoom)
    const [searchValue, setSearchValue] = useState('')

    const watch = true;
    const {
        latitude,
        longitude,
    } = usePosition(watch);

    const mapState = {
        width: 3538,
        center: center,
        zoom: zoom,
        controls: [],

    }

    useEffect(() => {
        dispatch(getPlacemarksTC(searchValue))
    }, [dispatch, searchValue])
    const handleMyLocation = () => {
        const location = [latitude!, longitude!]
        dispatch(myLocationAC(location, 14))
        dispatch(centerPositionAC(location))
    };

    return (
        <div className={s.app}>

            <div className={s.search_container}>
                <div className={s.search}>
                    <input type="text" className={s.search_box} placeholder="Search"/>
                    <input value="search" type="submit" className={s.button}/>
                    <input value="X" type="submit" className={s.button}/>
                    {hideResults
                        ? <button onClick={() => setHideResults(false)}>hide</button>
                        : <button onClick={() => setHideResults(true)}>show</button>}
                </div>


                {hideResults &&
                <div className={s.results}>
                    <div className={s.result}></div>
                </div>}
            </div>

            <YMaps query={{load: "package.full"}}>
                <Map width="100%" height="100vh" state={{zoom: zoom, center: center}} defaultState={mapState}
                     modules={["geoObject.addon.editor", "geolocation", "geocode"]}>
                    {coordinates.map((c) => (
                        <Placemark
                            geometry={[c.geometry.coordinates[1], c.geometry.coordinates[0]]}
                            modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                            properties={{
                                balloonContentHeader: c.properties.CompanyMetaData.name,
                                balloonContentBody: c.properties.CompanyMetaData.address,
                                balloonContentFooter: c.properties.CompanyMetaData.url,
                            }}
                        />
                    ))}
                    <Placemark
                        geometry={[53.917485, 27.604842]}
                        options={{
                            editorDrawingCursor: "crosshair",
                            editorMaxPoints: 1,
                            fillColor: "#00FF00",
                            // Цвет обводки.
                            strokeColor: "#0000FF",
                            // Ширина обводки.
                            strokeWidth: 5
                        }}
                        properties={{
                            balloonContentHeader: "It-инкубатор",
                            balloonContentBody: "Беларусь, Минск,ул. Сурганова, 2",
                            balloonContentFooter: "http://it-kamasutra.com/",
                        }}
                    />
                    <Placemark
                        geometry={myLocation}

                        options={{
                            preset: "islands#circleDotIcon",
                            iconColor: '#ff0000'
                        }}
                    />
                    <GeolocationControl onClick={handleMyLocation} options={{float: 'right'}}/>
                </Map>
            </YMaps>
        </div>
    )
}

export default MapApp
