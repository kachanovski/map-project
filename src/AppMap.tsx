import React, {ChangeEvent, useEffect, useState} from 'react';
import {usePosition} from 'use-position';
import s from './App.module.css'
import {GeolocationControl, Map, Placemark, YMaps} from 'react-yandex-maps';
import {useDispatch, useSelector} from 'react-redux';
import {centerPositionAC, FeaturesType, getPlacemarksTC, myLocationAC} from './store/MapReducer';
import {StateType} from './store/store';
import SearchBarInMap from './components/SearchBar/SearchBarInMap';
import {points} from './App';
import VoiceSearch from './components/VoiceSearch/VoiceSearch';


const AppMap = () => {

  const [hideResults, setHideResults] = useState(true)
  const dispatch = useDispatch()
  const feature = useSelector<StateType, Array<FeaturesType>>(state => state.map.feature)
  const myLocation = useSelector<StateType, Array<number>>(state => state.map.myLocation)
  const center = useSelector<StateType, Array<number>>(state => state.map.center)
  const zoom = useSelector<StateType, number>(state => state.map.zoom)
  const search = useSelector<StateType, string>(state => state.map.search)

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
    controls: []
  }

  useEffect(() => {
    dispatch(getPlacemarksTC(search))
  }, [dispatch, search])

  const handleMyLocation = () => {
    const location = [latitude!, longitude!]
    dispatch(myLocationAC(location, 14))
    dispatch(centerPositionAC(location))
  };

  const onSubmitSearch = () => {
    dispatch(getPlacemarksTC(searchValue))
    setHideResults(false)
  }

  const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
  }

  return (
    <div className={s.app}>

      <div className={s.search_container}>

        {/*search component*/}
        <div className={s.search}>
          <input type="text"
                 value={searchValue}
                 onChange={onChangeSearchValue}
                 className={s.search_box}
                 placeholder="Search"/>
          <input value="search"
                 type="submit"
                 onClick={onSubmitSearch}
                 className={s.button}/>
          <input value="X"
                 type="submit"
                 className={s.button}/>
          {hideResults
            ? <button onClick={() => setHideResults(false)}>show</button>
            : <button onClick={() => setHideResults(true)}>hide</button>}
        </div>

         {/*Voice Search*/}
        <div className={s.voice_search}>
          <VoiceSearch search={onSubmitSearch} setHideResults={setHideResults}/>
        </div>

        {!hideResults && <div className={s.results}>
          <SearchBarInMap resultArray={feature}/>
        </div>}

      </div>


      <YMaps query={{lang: 'ru_RU', load: 'package.full'}}>
        <Map width="100%"
             height="100vh"

             state={{zoom: zoom, center: center}}
             defaultState={mapState}
             modules={['geoObject.addon.editor', 'geolocation', 'geocode']}>
          {feature.map((c) => {
            return <Placemark
              geometry={[c.geometry.coordinates[1], c.geometry.coordinates[0]]}
              modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
              properties={{
                balloonContentHeader: c.properties.CompanyMetaData.name,
                balloonContentBody: c.properties.CompanyMetaData.address,
                balloonContentFooter: c.properties.CompanyMetaData.url,
              }}
            />
          })}
          <Placemark
            geometry={[53.917485, 27.604842]}
            options={{
              preset: 'islands#circleDotIcon',
              iconColor: '#002222'
            }}
            properties={{
              balloonContentHeader: 'It-инкубатор',
              balloonContentBody: 'Беларусь, Минск,ул. Сурганова, 2',
              balloonContentFooter: 'http://it-kamasutra.com/',
            }}
          />
          <Placemark
            geometry={myLocation}

            options={{
              preset: 'islands#circleDotIcon',
              iconColor: '#ff0000'
            }}
          />
          <GeolocationControl onClick={handleMyLocation} options={{float: 'right'}}/>
        </Map>
      </YMaps>
    </div>
  )
}

export default AppMap;
