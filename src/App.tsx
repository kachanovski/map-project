import React, {useEffect, useState} from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactDOM from 'react-dom';
import axios from 'axios'
import {Clusterer, Map, Placemark, YMaps, YMapsApi} from 'react-yandex-maps';
import s from './Balloon.module.css'
import star from './assets/rating-icon.svg'
import instagram from './assets/instagram-logo.svg'
import facebook from './assets/facebook-logo.svg'
import email from './assets/email-symbol.svg'

type AddressType = {
  country: string
  city: string
  street: string
}
type PointType = {
  id: number
  title: string
  category: string
  img: string
  address: AddressType
  coords: Array<number>
}
type AnyObjectType = {
  [key: string]: any;
}

const mapState = {
  width: 900,
  height: 700,
  center: [54.86, 27.53],
  zoom: 5
}
const points: Array<PointType> = [
  {
    id: 1,
    title: 'ITMouse',
    category: 'IT school',
    img: 'https://traveldealworld.net/wp-content/uploads/2018/08/Getting-the-Best-of-Both-Luxury-and-Nature.jpg',
    address: {
      country: 'Belarus',
      city: 'Minsk',
      street: 'vulica Smaliačkova, 9'
    },
    coords: [53.910866, 27.585556]
  },
  {
    id: 2,
    title: 'Yandex.Schoolbook',
    category: 'IT school',
    img: 'https://traveldealworld.net/wp-content/uploads/2018/08/Getting-the-Best-of-Both-Luxury-and-Nature.jpg',
    address: {
      country: 'Russia',
      city: 'Moscow',
      street: 'Usachyova Street, 2с3'
    },
    coords: [55.730253, 37.573557]
  },
  {
    id: 3,
    title: 'Ukrainian IT School',
    category: 'IT school',
    img: 'https://traveldealworld.net/wp-content/uploads/2018/08/Getting-the-Best-of-Both-Luxury-and-Nature.jpg',
    address: {
      country: 'Ukraine',
      city: 'Kharkiv',
      street: 'Sumska street, 2'
    },
    coords: [49.993320, 36.232379]
  },
  {
    id: 4,
    title: 'Blogger School Riga',
    category: 'IT school',
    img: 'https://traveldealworld.net/wp-content/uploads/2018/08/Getting-the-Best-of-Both-Luxury-and-Nature.jpg',
    address: {
      country: 'Latvia',
      city: 'Riga',
      street: 'Dzirnavu Street, 42'
    },
    coords: [56.956809, 24.115346]
  },
  {
    id: 5,
    title: 'London School Of Commerce & IT',
    category: 'IT school',
    img: 'https://traveldealworld.net/wp-content/uploads/2018/08/Getting-the-Best-of-Both-Luxury-and-Nature.jpg',
    address: {
      country: 'United Kingdom',
      city: 'London',
      street: '59-66 Greenfield Rd, Whitechapel',
    },
    coords: [51.515944, -0.065272]
  }
]

const BalloonLayout = (layoutFactory: AnyObjectType): AnyObjectType => {
  const Layout = layoutFactory.createClass(
    `<div id="balloon" style="max-width: 350px"></div>`
  )
  return Layout;
}


type BalloonPropsType = {
  isOpen: boolean
  title: string
  img: string
  category: string
  street: string
  country: string
  city: string
}
const Balloon = (props: BalloonPropsType) => {
  const [open, setOpen] = useState<boolean>(props.isOpen);
  if (open) {
    return (

      <div className={s.balloon_card}>
        <button className={s.close} onClick={() => setOpen(false)}>&times;</button>
        <div className={s.balloon_top}>
          <img className={s.img} src={props.img} alt={props.title}/>
        </div>
        <div className={s.balloon_text}>
          <h3 className={s.title}>{props.title}</h3>
          <div className={s.category}>{props.category}</div>

          <div className={s.social}>
            <div className={s.rating}>(5)
              <img className={s.rating_star} src={star} alt="Rating"/>
              <img className={s.rating_star} src={star} alt="Rating"/>
              <img className={s.rating_star} src={star} alt="Rating"/>
              <img className={s.rating_star} src={star} alt="Rating"/>
              <img className={s.rating_star} src={star} alt="Rating"/>
            </div>
            <div className={s.links}>
              <a href="#"><img className={s.link} src={instagram} alt="instagram"/></a>
              <a href="#"><img className={s.link} src={facebook} alt="facebook"/></a>
              <a href="#"><img className={s.link} src={email} alt="email"/></a>
            </div>
          </div>


          <div className={s.str}>{props.street}</div>
          <div className={s.place}>{props.country}, {props.city}</div>
        </div>
      </div>

    )
  } else {
    return <></>
  }
}

const App = () => {
  /*   useEffect( () => {
        axios.get(`https://search-maps.yandex.ru/v1/?text=Аптека, Минск&type=biz&lang=ru_RU&results=10&apikey=6f1a0a0c-b9b7-49ed-a969-1db3f019a8d1`).then((res) => {
            console.log(res.data)
        })
    })*/

  const [state, setState] = useState<AnyObjectType>({
    ymaps: null as null | YMapsApi,
    selectedPoint: null as null | PointType
  })
  const onPlaceMarkClick = (point: PointType) => () => {
    setState({...state, selectedPoint: point});
  }


  return (
    <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <YMaps query={{lang: 'ru_RU', load: 'package.full'}}>
        <Map width={mapState.width}
             height={mapState.height}
             defaultState={mapState}
             modules={['geoObject.addon.editor']}
             onLoad={ymaps => setState({...state, ymaps})}>

          {state.ymaps &&
          <Clusterer
            options={{

              clusterDisableClickZoom: true,
              clusterOpenBalloonOnClick: true,
              preset: 'islands#invertedVioletClusterIcons',
              groupByCoordinates: false,
              balloonPanelMaxMapArea: 0,
              clusterBalloonContentLayoutWidth: 350,
              clusterBalloonLeftColumnWidth: 120,
              clusterBalloonItemContentLayout: BalloonLayout(
                state.ymaps.templateLayoutFactory
              )
            }}>

            {state.ymaps &&
            points.map((point, i) =>
              <Placemark
                key={i}
                modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                geometry={point.coords}
                onBalloonOpen={() => {
                  ReactDOM.hydrate(<Balloon title={point.title}
                                            country={point.address.country}
                                            city={point.address.city}
                                            street={point.address.street}
                                            category={point.category}
                                            img={point.img}
                                            isOpen={true}/>,
                    document.getElementById('balloon'))
                }}
                onClick={() => onPlaceMarkClick(point)}
                properties={{
                  balloonContentHeader: point.title,

                }}
                options={{
                  balloonLayout: BalloonLayout(state.ymaps.templateLayoutFactory),
                  balloonOffset: [-200, -20],
                  balloonPanelMaxMapArea: 0,
                  editorDrawingCursor: 'crosshair',
                  visible: true,
                  editorMaxPoints: 1,
                  fillColor: '#00FF00',
                  // Цвет обводки.
                  strokeColor: '#0000FF',
                  // Ширина обводки.
                  strokeWidth: 5
                }}
              />)
            }
          </Clusterer>}
        </Map>
      </YMaps>
    </div>
  )
}


export default App;
