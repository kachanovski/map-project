import React from 'react';
import s from './BookmarksItem.module.css'

// элемент внутри панели закладок

type BookmarksItemPropsType = {
  number?: number
  name?: string
  address?: string
  url?: string
  deleteFromBookmarks: (id: string) => void
  id: string
}

const BookmarksItem = (props: BookmarksItemPropsType) => {
  return (
    <div className={s.book_item}>
      <button className={s.save_btn}
              onClick={() => props.deleteFromBookmarks(props.id)}>Delete
      </button>
      <h4 className={s.title}>---{props.number}--- {props.name}</h4>
      <div className={s.address}>{props.address}</div>
      <div className={s.address}>{props.url}</div>
    </div>
  )
}

export default BookmarksItem;