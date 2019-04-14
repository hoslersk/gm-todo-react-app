import PropTypes from 'prop-types';
import React from 'react';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.node,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  onClick: noop,
  text: '',
  type: 'default',
};

/**
 * Button component
 * @returns {ReactElement}
 */
const Button = ({ onClick, text, type }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'button',

        buttonCls = `${baseCls} ${baseCls}--${type}`;

  return (
    <button className={buttonCls} onClick={onClick}>
      {text}
    </button>
  )
};

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
