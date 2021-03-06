import PropTypes from 'prop-types';
import React from 'react';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.node,
  type: PropTypes.string,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  disabled: false,
  onClick: noop,
  text: '',
  type: 'default',
};

/**
 * Button component
 * @returns {ReactElement}
 */
const Button = ({ className, disabled, onClick, text, type }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'button',

        buttonCls = `${baseCls} ${baseCls}--${type}${className ? ' ' + className : ''}`;

  return (
    <button className={buttonCls} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  )
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
