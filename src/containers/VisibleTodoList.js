import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import TodoList from '../components/todos/TodoList'
import { VisibilityFilters } from '../actions/types'
import { getVisibleTodos } from '../selectors'

const mapStateToProps = state => ({
  todos: getVisibleTodos(state)
})

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)
