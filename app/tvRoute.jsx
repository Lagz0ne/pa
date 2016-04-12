import React from 'react';
import {Route, IndexRoute} from 'react-router';

import TVScreen from './containers/queue/TVScreen';

import { store } from './store';

// export default(<Route path='/' component={Pulse} onEnter={secure}/>);
export default(
  <Route path='/tv' component={TVScreen} />
);
