import React, {useEffect, useState} from 'react';
import ReactDOMServer from 'react-dom/server';
import ReactDOM from 'react-dom';
import axios from 'axios'
import {Clusterer, Map, Placemark, YMaps, YMapsApi} from 'react-yandex-maps';

const mapState = {
  width: 800,
  height: 700,
  center: [53.86, 27.53],
  zoom: 10,
  schools: [
    {
      id: 1,
      title: 'IT Education Center',
      img: 'https://lh3.googleusercontent.com/proxy/Hp-ATAuEzyGUHSIa4Dh1E7kIzWC_gVDaHRYh0jUkJgDqhahODKIUC12sPIiHT1w-b3d46R5FnccD1i1cLYSM5XAlRNeZQ2d-4zmgeFSNi8SpN3VJeKQ',
      address: 'г.Киев, бульвар Вацлава Гавела, 4 (5 этаж) офис № 43'
    },
    {
      id: 2,
      title: 'IT школа Samsung',
      img: 'https://lh3.googleusercontent.com/proxy/Hp-ATAuEzyGUHSIa4Dh1E7kIzWC_gVDaHRYh0jUkJgDqhahODKIUC12sPIiHT1w-b3d46R5FnccD1i1cLYSM5XAlRNeZQ2d-4zmgeFSNi8SpN3VJeKQ',
      address: 'Kyiv, Shota Rustaveli Street, 46'
    },
    {
      id: 3,
      title: 'Junior IT',
      img: 'https://lh3.googleusercontent.com/proxy/Hp-ATAuEzyGUHSIa4Dh1E7kIzWC_gVDaHRYh0jUkJgDqhahODKIUC12sPIiHT1w-b3d46R5FnccD1i1cLYSM5XAlRNeZQ2d-4zmgeFSNi8SpN3VJeKQ',
      address: 'Kyiv, Marshala Tymoshenka Street, 13А'
    }
  ]
};
// const placeMark = {
//
//   balloonContentHeader: `<a href="#">${mapState.schools[0].title}</a>`,
//   balloonContentBody: `<img src=${mapState.schools[0].img} height="150" width="200"/>`,
//   balloonContentFooter: `<div>${mapState.schools[0].address}</div>`,
//   balloonShadow: true,
//
// }

const point = {
  title: 'Placemark 0',
  descr: 'Some description',
  coords: [53.839362, 27.617904]
}


const BalloonLayout = (layoutFactory: any) => {
  const Layout = layoutFactory.createClass(
    `<div id="balloon" style="background-color: white; padding: 20px; width: 100px">` +
    `<a class="close" onClick={() => style="display:none"} href="#">&times;</a>` +
    `<div id="inner-balloon">` +
    `</div>` +
    `</div>`,
    {
      build: function () {
        Layout.superclass.build.call(this);
      },
      clear: function () {
        Layout.superclass.clear.call(this);
      }
    })
  return Layout;
}
// const BalloonContentLayout = (layoutFactory: any, Component: any) => {
//   const html = ReactDOMServer.renderToString(Component);
//   const Layout = layoutFactory.createClass(`<div id="inner-balloon" style="background-color: antiquewhite">${html}</div>`, {
//     build: function () {
//       Layout.superclass.build.call(this);
//     }
//   });
//   return Layout;
// };


const Balloon = () => {
  return (
    <div style={{backgroundColor: 'red', border: '1px solid blue'}}>
      <h1>Test</h1>
      <div>Hello!</div>
    </div>
  )
}

const App = () => {
  const [state, setState] = useState({
    ymaps: null as null | YMapsApi,
    selectedPoint: null
  })

  const [open, setOpen] = useState(true);
  /*   useEffect( () => {
         axios.get(`https://search-maps.yandex.ru/v1/?text=Аптека, Минск&type=biz&lang=ru_RU&results=10&apikey=6f1a0a0c-b9b7-49ed-a969-1db3f019a8d1`).then((res) => {
             console.log(res.data)
         })
     })*/
  const onPlacemarkClick = (point: any) => () => {
    setState({...state, selectedPoint: point});
  };

  return (
    <div style={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <YMaps query={{lang: 'ru_RU', load: 'package.full'}}>
        <Map width={mapState.width} height={mapState.height} defaultState={mapState}
             modules={['geoObject.addon.editor']}
             onLoad={ymaps => setState({...state, ymaps})}
        >
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
              // clusterBalloonItemContentLayout: BalloonLayout(
              //   state.ymaps.templateLayoutFactory,
              // )
            }}
          >
            <Placemark

              geometry={[53.839362, 27.617904]}
              modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}

              onBalloonOpen={() => {
                ReactDOM.hydrate(<Balloon/>,
                  document.getElementById('inner-balloon'))
              }}
              properties={{
                balloonContentHeader: 'Hello',

              }}
              options={{
                balloonLayout: BalloonLayout(state.ymaps.templateLayoutFactory),

                // balloonContentLayout: BalloonContentLayout(
                //   state.ymaps.templateLayoutFactory,
                //   <Balloon />
                // ),
                balloonPanelMaxMapArea: 0,
                editorDrawingCursor: 'crosshair',
                editorMaxPoints: 1,
                fillColor: '#00FF00',
                // Цвет обводки.
                strokeColor: '#0000FF',
                // Ширина обводки.
                strokeWidth: 5
              }}
            />
          </Clusterer>}
        </Map>
      </YMaps>
    </div>
  )
}


export default App;
