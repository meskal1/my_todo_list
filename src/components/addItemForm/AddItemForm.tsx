import { ChangeEvent, useState, KeyboardEvent, memo, FC } from 'react'

import { ControlPoint } from '@mui/icons-material'
import { IconButton, TextField } from '@mui/material'

import { cutSpaces } from '../../utils/cutSpaces'

import s from './AddItemForm.module.scss'

export type AddItemFormType = {
  addItem: (itemTitle: string) => void
  isDisabled?: boolean
  label?: string
  className?: string
}

export const AddItemForm: FC<AddItemFormType> = memo(
  ({ addItem, isDisabled = false, label = 'Type value', className = '' }) => {
    const [error, setError] = useState('')
    const [inputValue, setInputValue] = useState('')

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
      setError('')
      setInputValue(e.currentTarget.value)
    }

    const handleClickCreateTask = () => {
      if (cutSpaces(inputValue) !== '') {
        addItem(cutSpaces(inputValue))
        setInputValue('')
      } else {
        setError('Title is required')
      }
    }

    const handleKeyDownCreateTask = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleClickCreateTask()
      }
    }

    const handleBlurInput = () => setError('')

    return (
      <div className={`${s.addItemFormContainer} ${className}`}>
        <TextField
          fullWidth
          size="small"
          className={s.addInputForm}
          disabled={isDisabled}
          error={!!error}
          label={label}
          helperText={error}
          value={inputValue}
          onFocus={handleBlurInput}
          onBlur={handleBlurInput}
          onChange={handleChangeInput}
          onKeyPress={handleKeyDownCreateTask}
          autoComplete="off"
        />
        <IconButton onClick={handleClickCreateTask} disabled={isDisabled}>
          <ControlPoint fontSize="small" />
        </IconButton>
      </div>
    )
  }
)
