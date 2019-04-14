import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import TodosPage from './todos-page';
import Header from './header';

/**
 * Prop Types
 * @private
 */
const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

/**
 * App component
 * @returns {ReactElement}
 */
const App = ({ children }) => {
  return (
    <BrowserRouter>
      <Fragment>
        <Header />

        <Switch>
          <Route exact path="/" component={TodosPage} />
          <Route path="/:filterBy" component={TodosPage} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
};

App.propTypes = propTypes;

export default App;
