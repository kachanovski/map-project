import React from "react";
import {Map, Placemark, YMaps} from "react-yandex-maps";

const mapState = {
    width: 800,
    height: 800,
    center: [53.54, 27.33],
    zoom: 8
};


const App = () => {
    return (
        <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <YMaps>
                <Map width={mapState.width} height={mapState.height} defaultState={mapState}
                     modules={["geoObject.addon.editor"]}>
                    <Placemark
                        geometry={[]}
                        options={{
                            editorDrawingCursor: "crosshair",
                            editorMaxPoints: 5,
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
