import React from 'react';
import s from './BookmarksButton.module.css'

type BookmarksButtonPropsType = {
  setHideBookmarks: () => void
  buttonValue: number
}

const BookmarksButton = (props: BookmarksButtonPropsType) => {
  return (
    <>
      <button className={s.bookmarks_btn}
              onClick={props.setHideBookmarks}>
        {props.buttonValue}
      </button>
    </>
  )
}
export default BookmarksButton;