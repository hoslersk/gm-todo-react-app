import PropTypes from 'prop-types';
import React from 'react';
import Button from './button';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  onClick: noop,
  text: '',
};

/**
 * Link component
 * @returns {ReactElement}
 */
const TodoLink = ({ archived, id, text, onClick, onClickArchive, status }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'todo-link',

        inputLabelCls = `${baseCls}__input-label`,

        checkboxCls = `${baseCls}__checkbox`,

        archiveButtonCls = `${baseCls}__archive-button`;

  const archiveButtonText = archived ? 'Unarchive' : 'Archive';

  return (
    <div className={baseCls}>
      <input
        checked={status === 'complete'}
        className={checkboxCls}
        id={`id-${id}-toggle`}
        type="checkbox"
        onChange={onClick}
      />
      <label className={inputLabelCls} htmlFor={`id-${id}-toggle`}>
        {text}
      </label>

      {
        status === 'complete' &&
        <Button
          className={archiveButtonCls}
          onClick={onClickArchive}
          text={archiveButtonText}
        />
      }
    </div>
  );
};

TodoLink.propTypes = propTypes;
TodoLink.defaultProps = defaultProps;

export default TodoLink;
