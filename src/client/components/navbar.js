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
};

/**
 * Default Props
 * @private
 */
const defaultProps = {
  filterBy: '',
};

/**
 * Navbar component
 * @returns {ReactElement}
 */
const Navbar = ({ bulkArchiveTodos, completedTodosCount, filterBy }) => {
  /**
   * Base CSS class
   */
  const baseCls = 'navbar',

        navCls = `${baseCls}__nav container`,

        listCls = `${baseCls}__list`,

        listItemCls = `${baseCls}__list-item`,

        navLinkCls = `${baseCls}__nav-link`,

        activeNavLinkCls = `${navLinkCls}--active`,

        buttonCls = `${baseCls}__button`;

  /**
   * Configs for all nav-links
   */
  const navLinksConfig = [
    {
      activeClassName: activeNavLinkCls,
      className: navLinkCls,
      exact: true,
      label: 'All',
      to: '/',
    },
    {
      activeClassName: activeNavLinkCls,
      className: navLinkCls,
      exact: true,
      label: 'Active',
      to: '/active',
    },
    {
      activeClassName: activeNavLinkCls,
      className: navLinkCls,
      exact: true,
      label: 'Completed',
      to: '/completed',
    },
    {
      activeClassName: activeNavLinkCls,
      className: navLinkCls,
      exact: true,
      label: 'Archived',
      to: '/archived',
    },
  ];

  /**
   * Renders All List Items
   *
   * @returns {Array} - Returns an array of li React Elements
   */
  const renderListItems = () => {
    return navLinksConfig.map(({ activeClassName, className, exact, label, to }) =>
      <li className={listItemCls} key={label.toLowerCase()}>
        <NavLink {...{ activeClassName, className, exact, to }}>
          {label}
        </NavLink>
      </li>
    );
  }

  return (
    <div className={baseCls}>
      <nav className={navCls}>
        <ul className={listCls}>
          {renderListItems()}
        </ul>

        <Button
          className={buttonCls}
          disabled={completedTodosCount === 0}
          onClick={bulkArchiveTodos}
          text="Archive all completed"
        />
      </nav>
    </div>
  );
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;
