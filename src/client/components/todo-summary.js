import PropTypes from 'prop-types';
import React from 'react';
import Button from './button';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  activeTodosCount: PropTypes.number,
  bulkCompleteTodos: PropTypes.func,
  filterBy: PropTypes.string,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  activeTodosCount: 0,
  bulkCompleteTodos: noop,
};

/**
 * Button component
 * @returns {ReactElement}
 */
const TodoSummary = ({ activeTodosCount, bulkCompleteTodos }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'todo-summary',

        textCls = `${baseCls}__text`;

  const text = `${activeTodosCount} task${activeTodosCount === 1 ? '' : 's'} remaining`;

  return (
    <div className={baseCls}>
      <span className={textCls}>{text}</span>
      <Button
        disabled={activeTodosCount === 0}
        onClick={bulkCompleteTodos}
        text="Complete All"
        type="link"
      />
    </div>
  )
};

TodoSummary.propTypes = propTypes;
TodoSummary.defaultProps = defaultProps;

export default TodoSummary;
