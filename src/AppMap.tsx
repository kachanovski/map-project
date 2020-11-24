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
import BookmarksBar from './components/Bookmarks/BookmarksBar/BookmarksBar';
import {
  BookmarksType,
  deleteFromBookmarksAC,
  setBookmarksAC,
  toggleSavingInBookmarksAC
} from './store/BookmarksReducer';
import BookmarksButton from './components/Bookmarks/BookmarksButton/BookmarksButton';


const AppMap = () => {

  const [hideResults, setHideResults] = useState(true)
  const [hideBookmarks, setHideBookmarks] = useState(true)
  const dispatch = useDispatch()
  const feature = useSelector<StateType, Array<FeaturesType>>(state => state.map.feature)
  const bookmarks = useSelector<StateType, BookmarksType>(state => state.books.bookmarks)
  const myLocation = useSelector<StateType, Array<number>>(state => state.map.myLocation)
  const center = useSelector<StateType, Array<number>>(state => state.map.center)
  const zoom = useSelector<StateType, number>(state => state.map.zoom)
  const search = useSelector<StateType, string>(state => state.map.search)
  const savedInBookmarks = useSelector<StateType, Array<string>>(state => state.books.savedInBookmarks)

    const [searchValue, setSearchValue] = useState<string>('')

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
        minZoom: 3,
        maxZoom: 20,
    }

  useEffect(() => {
    dispatch(getPlacemarksTC(search))
  }, [dispatch, search])

  const handleMyLocation = () => {
    const location = [latitude!, longitude!]
    dispatch(myLocationAC(location, 14))
    dispatch(centerPositionAC(location))
  };

    const onSubmitSearch = async () => {
        await dispatch(getPlacemarksTC(searchValue))
        dispatch(setZoomAC(11))
        dispatch(centerPositionAC([feature[0].geometry.coordinates[1], feature[0].geometry.coordinates[0]]))
        setHideResults(true)
    }

  const onChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value)
  }
  const showSearchBar = () => {
    if (!hideBookmarks) {
      setHideBookmarks(true)
    }
    setHideResults(false)
  }
  const toggleBookmarks = () => {
    if (!hideResults) {
      setHideResults(true)
    }
    setHideBookmarks(!hideBookmarks)
  }

  const setBookmarks = (id: string) => {
    const bookmark = feature.filter(b =>
      b.properties.CompanyMetaData.id === id)
    dispatch(setBookmarksAC(bookmark));
    dispatch(toggleSavingInBookmarksAC(true, id));
  }

  const deleteFromBookmarks = (id: string) => {
    dispatch(deleteFromBookmarksAC(id));
    dispatch(toggleSavingInBookmarksAC(false, id));
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
            ? <button onClick={showSearchBar}>show</button>
            : <button onClick={() => setHideResults(true)}>hide</button>}
        </div>

        {/*Voice Search*/}
        <div className={s.voice_search}>
          <VoiceSearch search={onSubmitSearch}
                       setHideResults={setHideResults}/>
          {/*Bookmarks Button*/}
          <BookmarksButton setHideBookmarks={toggleBookmarks}
                           buttonValue={bookmarks.length}/>
        </div>

        {!hideResults && <div className={s.results}>
          {/*Search Bar*/}
          <SearchBarInMap resultArray={feature}
                          setBookmarks={setBookmarks}
                          savedInBookmarks={savedInBookmarks}/>
        </div>}

        {/*Bookmarks Bar*/}
        {!hideBookmarks && <div className={s.bookmarks}>
          <BookmarksBar bookmarksArray={bookmarks}
                        deleteFromBookmarks={deleteFromBookmarks}/>
        </div>}

      </div>

            <YMaps query={{lang: 'ru_RU', load: 'package.full'}}>
                <Map width="100%"
                     height="100vh"
                     options={{
                         maxAnimationZoomDifference: 50,
                         maxZoom: 40,
                     }}
                     state={{zoom: zoom, center: center}}
                     defaultState={mapState}
                     modules={["geoObject.addon.editor", "geolocation", "geocode"]}>
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
                            preset: "islands#circleDotIcon",
                            iconColor: '#002222'
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

export default AppMap;
