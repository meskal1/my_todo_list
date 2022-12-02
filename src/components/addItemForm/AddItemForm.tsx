import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import s from '../../app/App.module.scss'
import { IconButton, TextField } from '@mui/material'
import { ControlPoint } from '@mui/icons-material'

export type AddItemFormType = {
  addItem: (itemTitle: string) => void
  isDisabled?: boolean
  label?: string
}

export const AddItemForm: React.FC<AddItemFormType> = React.memo(({ addItem, isDisabled, label }) => {
  //   console.log('render ADD_INPUT')
  const [error, setError] = useState<string>('')
  const [inputValue, setInputValue] = useState('')

  const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError('')
    setInputValue(e.currentTarget.value)
  }

  const onClickCreateTask = () => {
    if (inputValue.trim().length !== 0) {
      addItem(inputValue.trim())
      setInputValue('')
    } else {
      setError('Title is required')
    }
  }

  const onKeyDownCreateTask = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onClickCreateTask()
    }
  }

  const onBlurInput = () => {
    setError('')
  }

  return (
    <>
      <div className={s.addItemFormContainer}>
        <TextField
          fullWidth
          size='small'
          className={s.addInputForm}
          disabled={isDisabled}
          error={!!error}
          label={label || 'Type value'}
          helperText={error}
          value={inputValue}
          onBlur={onBlurInput}
          onChange={onChangeInputHandler}
          onKeyPress={onKeyDownCreateTask}
          autoComplete='off'
        />
        <IconButton onClick={onClickCreateTask} disabled={isDisabled}>
          <ControlPoint fontSize='small' />
        </IconButton>
      </div>
    </>
  )
})
