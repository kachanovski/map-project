import React, {useEffect} from "react";
import axios from 'axios'
import {Map, Placemark, YMaps} from "react-yandex-maps";

const mapState = {
    width: 800,
    height: 800,
    center: [53.86, 27.53],
    zoom: 10
};


const App = () => {

    useEffect( () => {
        axios.get(`https://search-maps.yandex.ru/v1/?text=Аптека, Минск&type=biz&lang=ru_RU&results=10&apikey=6f1a0a0c-b9b7-49ed-a969-1db3f019a8d1`).then((res) => {
            console.log(res.data)
        })
    })


    return (
        <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
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
    )
}

export default App
