import React, { useRef } from 'react'
import Button from '@material-ui/core/Button'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

const AddTodo = ({ dispatch }) => {
  let inputEl = useRef(null)

  const handleSubmit = e => {
    e.preventDefault()
    const { value } = inputEl.current
    dispatch(addTodo(value))
    inputEl.current.value = ''
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input ref={inputEl} style={{ width: '200px', lineHeight: '30px' }}/>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginLeft: '12px' }}
        >
          Add Todo
        </Button>
      </form>
    </div>
  )
}

export default connect()(AddTodo)
