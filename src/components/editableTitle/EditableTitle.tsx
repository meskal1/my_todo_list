import { ChangeEvent, KeyboardEvent, useState, memo, FC } from 'react'

import { TextField } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

import { RequestStatusType } from '../../app/appSlice'

import s from './EditableTitle.module.scss'

export type EditableTitleType = {
  itemTitle: string
  onChange: (taskTitle: string) => void
  entityStatus: RequestStatusType
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

export const EditableTitle: FC<EditableTitleType> = memo(
  ({ itemTitle, onChange, entityStatus }) => {
    const [editable, setEditable] = useState(false)
    const [titleValue, setTitleValue] = useState('')

    const handleDoubleClick = () => {
      if (entityStatus !== 'loading') {
        setTitleValue(itemTitle)
        setEditable(true)
      }
    }

    const handleBlurInput = () => {
      setEditable(false)
      if (titleValue !== itemTitle) {
        onChange(titleValue)
      }
    }

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
      setTitleValue(e.currentTarget.value)
    }

    const handleKeyDownInput = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleBlurInput()
      }
    }

    return (
      <>
        {editable ? (
          <ThemeProvider theme={theme}>
            <TextField
              variant="standard"
              fullWidth
              multiline={true}
              size="small"
              type="text"
              value={titleValue}
              onBlur={handleBlurInput}
              onChange={handleChangeInput}
              onKeyDown={handleKeyDownInput}
              autoFocus
              onFocus={e =>
                e.currentTarget.setSelectionRange(
                  e.currentTarget.value.length,
                  e.currentTarget.value.length
                )
              }
            />
          </ThemeProvider>
        ) : (
          <span className={s.editableTitle} onDoubleClick={handleDoubleClick}>
            {itemTitle}
          </span>
        )}
      </>
    )
  }
)
