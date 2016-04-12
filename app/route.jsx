import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Pulse from './containers/Pulse';
import Homepage from './containers/Homepage';
import CheckScreen from './containers/check/CheckScreen';
import PickScreen from './containers/pick/PickScreen';
import PackScreen from './containers/pack/PackScreen';
import LoginScreen from './containers/login/LoginScreen';
import QueueScreen from './containers/queue/QueueScreen';

import { store } from './store';

const secure = (nextState, replaceState, done) => {
  const {app: {user}} = store.getState();

  if (!user.isLoggedIn) {
    window.location.href = '/authenticate';
  }

  done();
}

const autoredirect = (nextState, replace, done) => {
  const {app: {user}} = store.getState();
  const currentLocation = nextState.location.pathname;

  if (nextState.location.pathname !== '/login' && !user.isLoggedIn) {
    replace('/login');
    done();
  } else {
    if (!user.isOrdinaryUser) {
      if (user.isCheckIn && currentLocation != `/check/${user.checkInPos}`) {
        replace(`/check/${user.checkInPos}`);
      } else if (user.isPacking && currentLocation != `/pack`) {
        replace(`/pack`);
      } else if (user.isCheckout && currentLocation != `/checkout`) {
        replace(`/checkout`);
      }
    }
    done();
  }
}

// export default(<Route path='/' component={Pulse} onEnter={secure}/>);
export default(
  <Route path='/' component={Pulse} onEnter={autoredirect}>
    <IndexRoute components={{title: 'Home', child: Homepage }} />
    <Route path='login' components={{title: 'Login', child: LoginScreen}} />
    <Route path='/check/:affinity' components={{title: 'Check in', child: CheckScreen}} />
    <Route path='/pack' components={{title: 'Packing', child: PackScreen }} />
    <Route path='/checkout' components={{title: 'Check out', child: PickScreen }} />
    <Route path='/queue' components={{title: 'Monitoring', child: QueueScreen}} />
  </Route>
);
