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
        axios.get(`https://search-maps.yandex.ru/v1/?text=Компьютерные type=biz&lang=ru_RU&results=500&apikey=6f1a0a0c-b9b7-49ed-a969-1db3f019a8d1`).then((res) => {
            console.log(res.data)
        })
    })


    return (
        <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>

        </div>
    )
}

export default App
