import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import { RequestStatusType } from '../../app/AppReducer'
import { TextField } from '@mui/material'
import s from '../../app/App.module.scss'

export type EditableTitleType = {
  itemTitle: string
  onChange: (taskTitle: string) => void
  entityStatus: RequestStatusType
}

export const EditableTitle: React.FC<EditableTitleType> = React.memo(({ itemTitle, onChange, entityStatus }) => {
  //   console.log('render EDITABLE_TITLE')
  const [editable, setEditable] = useState(false)
  const [titleValue, setTitleValue] = useState('')

  const onDoubleClickSpan = () => {
    if (entityStatus !== 'loading') {
      setTitleValue(itemTitle)
      setEditable(true)
    }
  }

  const onBlurInput = () => {
    setEditable(false)
    if (titleValue !== itemTitle) {
      onChange(titleValue)
    }
  }

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.currentTarget.value)
  }

  const onKeyDownInputHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onBlurInput()
    }
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: '#e3f2fd', //this overide blue color
        light: 'red', //overides light blue
        dark: 'blue', //overides dark blue color
      },
    },
  })

  return (
    <>
      {editable ? (
        <ThemeProvider theme={theme}>
          <TextField
            variant='standard'
            fullWidth
            multiline={true}
            size='small'
            type='text'
            value={titleValue}
            onBlur={onBlurInput}
            onChange={onChangeInput}
            onKeyDown={onKeyDownInputHandler}
            onFocus={e => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
            autoFocus
          />
        </ThemeProvider>
      ) : (
        <span className={s.editableTitle} onDoubleClick={onDoubleClickSpan}>
          {itemTitle}
        </span>
      )}
    </>
  )
})
