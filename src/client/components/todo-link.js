import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
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
const TodoLink = ({ archived, archiveButtonText, id, text, onClick, onClickArchive, status }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'todo-link',

        inputLabelCls = `${baseCls}__input-label`,

        textCls = `${baseCls}__text`,

        checkboxCls = `${baseCls}__checkbox`,

        archiveButtonCls = `${baseCls}__archive-button`;

  return (
    <div className={baseCls}>
      {
        archived ?
          <span className={textCls}>{text}</span> :
          <Fragment>
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
          </Fragment>
      }

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
