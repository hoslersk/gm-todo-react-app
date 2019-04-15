import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Button from './button';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  archive: PropTypes.bool,
  archiveButtonText: PropTypes.node,
  id: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  onClick: PropTypes.func,
  onClickArchive: PropTypes.func,
  status: PropTypes.string,
  text: PropTypes.string,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  archive: false,
  archiveButtonText: '',
  onClick: noop,
  onClickArchive: noop,
  status: '',
  text: '',
};

/**
 * Link component
 * @returns {ReactElement}
 */
const TodoLink = ({ archived, archiveButtonText, id, onClick, onClickArchive, status, text }) => {
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
