import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Header component
 */
const Header = () => {
  /**
   * Base CSS class
   * @returns {ReactElement}
   */
  const baseCls = 'header',

        containerCls = `${baseCls}__container container`,
        
        linkCls = `${baseCls}__link`

  return (
    <header className={baseCls}>
      <div className={containerCls}>
        <Link className={linkCls} to="/">MyTodos</Link>
      </div>
    </header>
  )
};

export default Header;
