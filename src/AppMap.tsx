import React, {useState} from "react";
import s from './App.module.css'
import {Map, Placemark, YMaps, ZoomControl} from "react-yandex-maps";
import points from "./points.json";


const MapApp = () => {

    const [hideResults, setHideResults] = useState(false)

    const mapState = {
        width: 3538,
        minZoom: 3,
        center: [32.99054220474171, 3.8141637443059158],
        zoom: 3,
        controls: [],
    };

    /*    useEffect(() => {
            axios.get(`https://search-maps.yandex.ru/v1/?text=Компьютерные курсы&type=biz&lang=ru_RU&results=500&skip=1500&apikey=6f1a0a0c-b9b7-49ed-a969-1db3f019a8d1`).then((res) => {
                setFeatures(res.data.features)
                console.log(features)
                console.log(res.data.features)
            })
        }, [])*/

    console.log(points.features[0].geometry.coordinates)

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
                    {points.features.map(desc => <div key={desc.properties.CompanyMetaData.id} className={s.result}>
                        <h3>{desc.properties.CompanyMetaData.name}</h3>
                        <div>
                            {desc.properties.CompanyMetaData.name}
                        </div>
                        <a> {desc.properties.CompanyMetaData.url}</a>
                        <div>
                            {desc.properties.CompanyMetaData.address}
                            {desc.properties.CompanyMetaData.Phones}
                        </div>
                    </div>)}
                </div>}
            </div>
                <YMaps>
                    <Map width="100%" height="100vh" defaultState={mapState}
                         searchInside
                         modules={["geoObject.addon.editor"]}>
                        {points.features.map((point) => (
                            <Placemark
                                geometry={[point.geometry.coordinates[1], point.geometry.coordinates[0]]}
                                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                                properties={{
                                    balloonContentHeader: point.properties.CompanyMetaData.name,
                                    balloonContentBody: point.properties.CompanyMetaData.address,
                                    balloonContentFooter: point.properties.CompanyMetaData.url,
                                    hintContent: "Подсказка"
                                }}
                            />
                        ))}
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
                            properties={{
                                balloonContentHeader: "Заголовок",
                                balloonContentBody: "Содержимое",
                                balloonContentFooter: "Подвал",
                                hintContent: "Подсказка"
                            }}
                        />
                        <ZoomControl options={{float: 'right', right: 0}}/>
                    </Map>

                </YMaps>



        </div>
    )
}

export default MapApp
