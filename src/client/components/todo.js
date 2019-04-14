import PropTypes from 'prop-types';
import React from 'react';

import Button from './button';
import TodoLink from './todo-link';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filtered: PropTypes.bool,
  onClickDelete: PropTypes.func,
  onClickTodo: PropTypes.func,
  status: PropTypes.string,
  text: PropTypes.string,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filtered: false,
  onClickDelete: noop,
  onClickTodo: noop,
  status: '',
  text: '',
};

/**
 * Todo component
 * @returns {ReactElement}
 */
const Todo = ({ archived, filtered, id, onClickArchive, onClickDelete, onClickTodo, status, text }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'todo';

  const todoCls = baseCls
    + (status === 'complete' ? ' todo--status-complete' : '')
    + (filtered ? ' todo--filtered' : '');

  const deleteActionText = (
    <div>
      <span aria-hidden="true">✕</span>
      <span className="sr-only">Delete</span>
    </div>
  )

  return (
    <li className={todoCls}>
      <TodoLink id={id} text={text} onClick={onClickTodo} status={status} />

      {
        status === 'complete' &&
        <Button onClick={onClickArchive} text={archived ? 'Unarchive' : 'Archive'}  />
      }

      <Button onClick={onClickDelete} text={deleteActionText} type="muted" />
    </li>
  );
}

Todo.propTypes = propTypes;
Todo.defaultProps = defaultProps;

export default Todo;
