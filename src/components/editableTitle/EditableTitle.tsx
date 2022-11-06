import { Input, TextField } from '@mui/material'
import React, { ChangeEvent, useState, KeyboardEvent, useCallback } from 'react'

export type EditableTitleType = {
  itemTitle: string
  onChange: (taskTitle: string) => void
}

export const EditableTitle: React.FC<EditableTitleType> = React.memo(({ itemTitle, onChange }) => {
  console.log('render EDITABLE_TITLE')
  const [editable, setEditable] = useState(false)
  const [titleValue, setTitleValue] = useState('')

  const onDoubleClickSpan = () => {
    setTitleValue(itemTitle)
    setEditable(true)
  }

  const onBlurInput = () => {
    setEditable(false)
    onChange(titleValue)
  }

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.currentTarget.value)
  }

  const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onBlurInput()
    }
  }

  return (
    <>
      {editable ? (
        <TextField
          type='text'
          value={titleValue}
          onBlur={onBlurInput}
          onChange={onChangeInput}
          onKeyDown={onKeyDownInputHandler}
          autoFocus
        />
      ) : (
        <span onDoubleClick={onDoubleClickSpan}>{itemTitle}</span>
      )}
    </>
  )
})
