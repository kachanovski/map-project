import {MapsAPI} from "../api/yandex-map-api";
import {Dispatch} from 'redux';

export type GetPlaceMarks = ReturnType<typeof getPlacemarksAC>
export type SearchType = ReturnType<typeof searchAC>
export type MyLocationType = ReturnType<typeof myLocationAC>
export type CenterPositionType = ReturnType<typeof centerPositionAC>

export type ActionsType = GetPlaceMarks | SearchType | MyLocationType | CenterPositionType

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
    zoom: 3
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
        default:
            return state
    }
}

export const getPlacemarksAC = (feature: Array<FeaturesType>) => {
    return {
        type: 'MAPS/GET_PLACEMARKS', feature
    } as const
}

export const searchAC = (searchValue: string) => {
    return {
        type: 'MAPS/SEARCH_VALUE', searchValue
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

export const getPlacemarksTC = (searchValue: string) => {
    return (dispatch: Dispatch) => {
        MapsAPI.getResult(searchValue).then(res => {
            debugger
            dispatch(getPlacemarksAC(res.data.features))
        }).catch(e => {
            }
        )
    }
}