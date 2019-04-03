### Before using reselect please check 'before' branch

### Before using selector, the "filtering todo list" calculation is happening on the `VisibleTodoList.js` container, and whenever the page gets re-rendered, below expensive calculation will happen again!

containers/VisibleTodoList.js
```js
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    case 'SHOW_ALL':
    default:
      return todos
  }
}

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}
```

### After using selector, the calculation will be memorized, if the dependencies are not changed, the memorized result will be used, instead re-calculate again!!

selectors/index.js
```js
import { createSelector } from 'reselect'
import { VisibilityFilters } from '../actions/types'

const getTodos = state => state.todos
const getVisibilityFilter = state => state.visibilityFilter

export const getVisibleTodos = createSelector(
  [getVisibilityFilter, getTodos],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case VisibilityFilters.SHOW_ALL:
        return todos
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter(t => t.completed)
      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter(t => !t.completed)
      default:
        throw new Error('Unknown filter: ' + visibilityFilter)
    }
  }
)
```

containers/VisibleTodoList.js
```js
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
```
