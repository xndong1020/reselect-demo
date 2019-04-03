import React from 'react'
import Footer from './todos/Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const App = () => (
  <Grid
    container
    justify="center"
    alignItems="center"
    style={{ height: '90vh' }}
  >
    <Paper style={{ padding: '15em' }}>
      <AddTodo />
      <VisibleTodoList />
      <Footer />
    </Paper>
  </Grid>
)

export default App
