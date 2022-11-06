import React, { ChangeEvent, useState, KeyboardEvent, useCallback } from 'react'
import s from '../todolist/Todolist.module.scss'
import { IconButton, TextField } from '@mui/material'
import { ControlPoint } from '@mui/icons-material'

export type AddItemFormType = {
  addItem: (itemTitle: string) => void
}

export const AddItemForm: React.FC<AddItemFormType> = React.memo(({ addItem }) => {
  console.log('render ADD_INPUT')
  const [error, setError] = useState<string>('')
  const [inputValue, setInputValue] = useState('')

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError('')
    setInputValue(e.currentTarget.value)
  }

  const onClickAddTaskHandler = () => {
    if (inputValue.trim().length !== 0) {
      addItem(inputValue.trim())
      setInputValue('')
    } else {
      setError('Title is required')
    }
  }

  const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickAddTaskHandler()
    }
  }

  return (
    <>
      <div>
        <TextField
          error={!!error}
          label={'Type value'}
          helperText={error}
          value={inputValue}
          onChange={onChangeInputHandler}
          onKeyPress={onKeyDownAddTaskHandler}
        />
        <IconButton onClick={onClickAddTaskHandler}>
          <ControlPoint />
        </IconButton>
      </div>
    </>
  )
})
