import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

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
  const baseCls = 'todo',

        todoCls = baseCls
          + (status === 'complete' ? ' todo--status-complete' : '')
          + (filtered ? ' todo--filtered' : ''),

        deleteButtonCls = `${baseCls}__delete-button`,

        mobileActionsCls = `${baseCls}__mobile-actions`,

        mobileActionCls = `${baseCls}__mobile-action`;

  const archiveButtonText = archived ? 'Unarchive' : 'Archive';

  const deleteActionText = (
    <Fragment>
      <span aria-hidden="true">✕</span>
      <span className="sr-only">Delete</span>
    </Fragment>
  )

  return (
    <li className={todoCls}>
      <TodoLink
        archived={archived}
        archiveButtonText={archiveButtonText}
        id={id}
        text={text}
        onClick={onClickTodo}
        onClickArchive={onClickArchive}
        status={status}
      />

      <Button
        className={deleteButtonCls}
        onClick={onClickDelete}
        text={deleteActionText}
        type="muted"
      />

      <div className={mobileActionsCls}>
        <Button
          className={mobileActionCls}
          onClick={onClickArchive}
          text={archiveButtonText}
        />
        <Button
          className={mobileActionCls}
          onClick={onClickDelete}
          text="Delete"
          type="link"
        />
      </div>
    </li>
  );
}

Todo.propTypes = propTypes;
Todo.defaultProps = defaultProps;

export default Todo;
