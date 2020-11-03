import React, {useEffect, useState} from "react";
import s from './App.module.css'
import {Map, Placemark, YMaps} from "react-yandex-maps";
import axios from "axios";


const MapApp = () => {

    const [zoom, setZoom] = useState<number>(10)

    const mapState = {
        width: 1538,
        height: 900,
        center: [53.86, 27.53],
        zoom: 15
    };


    const zoomHandler = () => {
        setZoom(zoom + 1)
        console.log(zoom)
    }


    return (
        <div className={s.app}>

            <div className={s.search_container}>
                <div className={s.search}>
                    <input type="text" className={s.search_box} placeholder="Search"/>
                    <input value="search" type="submit" className={s.button}/>
                    <input value="X" type="submit" className={s.button}/>
                </div>

                <div className={s.results}>
                    <div className={s.result}/>
                    <div className={s.result}/>
                    <div className={s.result}/>
                    <div className={s.result}/>
                    <div className={s.result}/>
                    <div className={s.result}/>
                    <div className={s.result}/>
                    <div className={s.result}/>
                    <div className={s.result}/>
                    <div className={s.result}/>
                    <div className={s.result}/>
                    <div className={s.result}/>
                    <div className={s.result}/>
                </div>
            </div>

            <div className={s.map}>
                <YMaps>
                    <Map width={mapState.width} height={mapState.height} defaultState={mapState}
                         modules={["geoObject.addon.editor"]}>
                        <Placemark
                            geometry={[53.839362, 27.617904]}
                            options={{
                                editorDrawingCursor: "crosshair",
                                editorMaxPoints: 1,
                                fillColor: "#00FF00",
                                // Цвет обводки.
                                strokeColor: "#0000FF",
                                // Ширина обводки.
                                strokeWidth: 5
                            }}
                        />
                    </Map>

                </YMaps>
            </div>



        </div>
    )
}

export default MapApp
