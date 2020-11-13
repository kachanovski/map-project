import {FeaturesType} from './MapReducer';

const SET_BOOKMARKS = 'SET-BOOKMARKS';
const TOGGLE_SAVING_IN_BOOKMARKS = 'TOGGLE-SAVING-IN-BOOKMARKS'
const DELETE_FROM_BOOKMARKS = 'DELETE-FROM-BOOKMARKS'

// T y p e s
export type BookmarksType = Array<FeaturesType>;
export type InitialStateType = {
  bookmarks: BookmarksType
  savedInBookmarks: Array<string>
}
export type ActionsType = ReturnType<typeof setBookmarksAC>
  | ReturnType<typeof toggleSavingInBookmarksAC>
  | ReturnType<typeof deleteFromBookmarksAC>

export const initialState: InitialStateType = {
  bookmarks: [] as BookmarksType,
  savedInBookmarks: []
}
export type BookmarksReducerType = typeof initialState;

export const BookmarksReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case SET_BOOKMARKS:
      return {
        ...state,
        bookmarks: [...state.bookmarks,...action.bookmark]
      }
    case TOGGLE_SAVING_IN_BOOKMARKS:
      return {
        ...state,
        savedInBookmarks: action.isSaved
          ? [...state.savedInBookmarks, action.id]
          : state.savedInBookmarks.filter(b => b !== action.id)
      }
    case DELETE_FROM_BOOKMARKS:
      return {
        ...state,
        bookmarks: state.bookmarks.filter(b =>
        b.properties.CompanyMetaData.id !== action.id)
      }
    default:
      return state
  }
}

// A c t i o n  C r e a t o r s
export const setBookmarksAC = (bookmark: BookmarksType) => ({
  type: SET_BOOKMARKS, bookmark
} as const)
export const toggleSavingInBookmarksAC = (isSaved: boolean, id: string) => ({
  type: TOGGLE_SAVING_IN_BOOKMARKS, isSaved, id
} as const)
export const deleteFromBookmarksAC = (id: string) => ({
  type: DELETE_FROM_BOOKMARKS, id
} as const)