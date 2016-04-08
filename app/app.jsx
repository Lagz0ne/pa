import 'babel-polyfill';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';

/** Load theme **/
import appTheme from './app.scss';
import theme from './theme';

import { history, store } from './store';
import route from './route';

/** This hack is for material ui **/
const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
/** End of the hack **/

class Root extends Component {
  getChildContext = () => ({ muiTheme: theme })

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          {route}
        </Router>
      </Provider>
    );
  }
}

Root.childContextTypes = { muiTheme: React.PropTypes.object };

ReactDOM.render(<Root />, document.getElementById('app'));
