import {MapsAPI} from "../api/yandex-map-api";
import {Dispatch} from 'redux';

export type GetPlaceMarks = ReturnType<typeof getPlacemarksAC>
export type SearchType = ReturnType<typeof setSearchValueAC>
export type MyLocationType = ReturnType<typeof myLocationAC>
export type CenterPositionType = ReturnType<typeof centerPositionAC>
export type SetZoomType = ReturnType<typeof setZoomAC>

export type ActionsType = GetPlaceMarks | SearchType | MyLocationType | CenterPositionType | SetZoomType

export type FeaturesType = {
    geometry: CoordinatesType
    properties: PropertiesType
}

export type CoordinatesType = {
    coordinates: Array<number>
}

type PropertiesType = {
    CompanyMetaData: CompanyMetaDataType
}

type CompanyMetaDataType = {
    name: string
    address: string
    url: string
}

export type InitialStateType = {
    feature: Array<FeaturesType>
    myLocation: Array<number>
    center: Array<number>
    zoom: number
    search: string
}

let InitialState: InitialStateType = {
    feature: [
        {
            geometry: {
                coordinates: []
            },
            properties: {
                CompanyMetaData: {
                    name: '',
                    address: '',
                    url: ''
                }
            }
        }
    ],
    myLocation: [],
    center: [32.99054220474171, 3.8141637443059158],
    zoom: 3,
    search: ''
}

export const MapReducer = (state = InitialState, action: ActionsType) => {
    switch (action.type) {
        case "MAPS/GET_PLACEMARKS": {
            return {
                ...state,
                ...state.feature,
                feature: action.feature
            }
        }
        case "MAPS/MY_LOCATION":
            return {
                ...state,
                ...state.myLocation,
                myLocation: action.location,
                zoom: action.zoom
            }
        case "MAPS/CENTER_POSITION":
            return {
                ...state,
                center: action.center
            }
        case "MAPS/SEARCH_VALUE":
            return {
                ...state,
                searchValue: action.search
            }
        case "MAPS/SET_ZOOM":
            return {
                ...state,
                zoom: action.zoom
            }

        default:
            return state
    }
}

export const getPlacemarksAC = (feature: Array<FeaturesType>) => {
    return {
        type: 'MAPS/GET_PLACEMARKS', feature
    } as const
}

export const setSearchValueAC = (search: string) => {
    return {
        type: 'MAPS/SEARCH_VALUE', search
    } as const
}
export const myLocationAC = (location: Array<number>, zoom: number) => {
    return {
        type: 'MAPS/MY_LOCATION', location, zoom
    } as const
}
export const centerPositionAC = (center: Array<number>) => {
    return {
        type: 'MAPS/CENTER_POSITION', center
    } as const
}
export const setZoomAC = (zoom: number) => {
    return {
        type: 'MAPS/SET_ZOOM', zoom
    } as const
}

export const getPlacemarksTC = (search: string) => async (dispatch: Dispatch) => {
    try {
        const items = await MapsAPI.getResult(search)
        dispatch(getPlacemarksAC(items.data.features))
    } catch (e) {

    }
}