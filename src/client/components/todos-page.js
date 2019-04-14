import { Link } from 'react-router';
import PropTypes from 'prop-types';
import React from 'react';

import { api, getApiPromise } from '../helpers/api';
import Button from './button';
import Navbar from './navbar';
import TodoForm from './todo-form';
import TodoLink from './todo-link';
import Todos from './todos';

/**
 * TodosPage component
 * @class
 */
class TodosPage extends React.Component {
  /**
   * Base CSS class
   * @static
   */
  static baseCls = 'todos-page'

  /**
   * Prop types
   * @static
   */
  static propTypes = {
    params: PropTypes.object,
  };

  /**
   * Constructor
   * @constructor
   *
   * @param  {object} props - Props
   */
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
    };

    this.addTodo = this.addTodo.bind(this);
    this.getTodos = this.getTodos.bind(this);
    this.postTodo = this.postTodo.bind(this);
    this.updateTodos = this.updateTodos.bind(this);
    this.bulkCompleteTodos = this.bulkCompleteTodos.bind(this);
    this.bulkArchiveTodos = this.bulkArchiveTodos.bind(this);
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    api('GET', null, this.getTodos);
  }

  /**
   * Get todos
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  getTodos(json) {
    const todos = JSON.parse(json);
    this.updateTodos(todos);
  }

  /**
   * Add todo
   *
   * @param  {string} text - Todo text
   */
  addTodo(text) {
    if (!text) {
      return;
    }

    api('POST', { text }, this.postTodo);
  }

  /**
   * Posts new todo to the todos collection
   *
   * @param  {object} json - Resulting JSON from fetch
   */
  postTodo(json) {
    this.setState({
      todos: [...json],
    });
  }

  /**
   * Update todos array state
   *
   * @param  {Array} todos - Array of todo objects
   */
  updateTodos(todos) {
    this.setState({ todos });
  }

  /**
   * Bulk update "active" status todos to "complete"
   *
   */
  bulkCompleteTodos() {
    const activeTodos = this.state.todos.filter(todo => todo.status === 'active');
    const newlyCompletedTodos = activeTodos.map(({ status, ...otherData }) =>
      ({ status: 'complete', ...otherData })
    );

    api('PATCH', newlyCompletedTodos, this.updateTodos);
  }

  /**
   * Bulk update "complete" state todos to archive: true
   *
   */
  bulkArchiveTodos() {
    const completedTodos = this.state.todos.filter(todo => todo.status === 'complete');
    const newlyArchivedTodos = completedTodos.map(({ archive, ...otherData }) =>
      ({ archive: true, ...otherData })
    );

    api('PATCH', newlyArchivedTodos, this.updateTodos);
  }

  /**
   * Render
   * @returns {ReactElement}
   */
  render() {
    const { filterBy } = this.props.match.params,
          activeTaskCount = this.state.todos.filter(todo => todo.status === 'active').length;

    return (
      <div className={TodosPage.baseCls}>
        <Navbar bulkArchiveTodos={this.bulkArchiveTodos} filterBy={filterBy} />

        <main className="container">
          {
            (filterBy === 'active' || !filterBy) && !!activeTaskCount &&
            <div>
              {activeTaskCount} task{activeTaskCount === 1 ? '' : 's'} remaining
              <Button onClick={this.bulkCompleteTodos} text="Complete All" type="link" />
            </div>
          }

          <TodoForm onSubmit={this.addTodo} />

          <Todos
            filterBy={filterBy}
            todos={this.state.todos}
            updateTodos={this.updateTodos}
          />
        </main>
      </div>
    );
  }
}

export default TodosPage;
