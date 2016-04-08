import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Pulse from './containers/Pulse';
import Homepage from './containers/Homepage';
import CheckScreen from './containers/check/CheckScreen';
import PickScreen from './containers/pick/PickScreen';
import PackScreen from './containers/pack/PackScreen';

import store from './store';

const secure = (nextState, replaceState, done) => {
  const {app: {user}} = store.getState();

  if (!user.isLoggedIn) {
    window.location.href = '/authenticate';
  }

  done();
}

// export default(<Route path='/' component={Pulse} onEnter={secure}/>);
export default(
  <Route path='/' component={Pulse}>
    <IndexRoute component={Homepage} />
    <Route path='/check/:affinity' component={CheckScreen} />
    <Route path='/pack' component={PackScreen} />
    <Route path='/pick' component={PickScreen} />
  </Route>
);
