import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Button from './button';

const noop = () => {};

/**
 * Prop Types
 * @private
 */
const propTypes = {
  filterBy: PropTypes.string,
  onClickFilter: PropTypes.func,
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: '',
  onClickFilter: noop,
};

/**
 * Navbar component
 * @returns {ReactElement}
 */
const Navbar = ({ bulkArchiveTodos, filterBy, onClickFilter }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'navbar'

  let activeLinkCls = `${baseCls}__item`;
  activeLinkCls += filterBy === 'active' ? ` ${baseCls}__item--active` : '';

  let completedLinkCls = `${baseCls}__item`;
  completedLinkCls += filterBy === 'completed' ? ` ${baseCls}__item--active` : '';

  let archivedLinkCls = `${baseCls}__item`;
  archivedLinkCls += filterBy === 'archived' ? ` ${baseCls}__item--active` : '';

  return (
    <div className={baseCls}>
      <NavLink
        activeClassName={`${baseCls}__item--active`}
        className={`${baseCls}__item`}
        exact
        to="/"
      >
        All
      </NavLink>
      <NavLink className={activeLinkCls} to="/active">
        Active
      </NavLink>
      <NavLink className={completedLinkCls} to="/completed">
        Completed
      </NavLink>
      <NavLink className={archivedLinkCls} to="/archived">
        Archived
      </NavLink>
      <Button text="Archive all completed" onClick={bulkArchiveTodos} />
    </div>
  );
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
