import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Pulse from './containers/Pulse';
import store from './store';

const secure = (nextState, replaceState, done) => {
  const {app: {user}} = store.getState();

  console.log(store.getState());
  if (!user.isLoggedIn) {
    window.location.href = '/authenticate';
  }

  done();
}

export default(<Route path='/' component={Pulse} onEnter={secure}/>);
