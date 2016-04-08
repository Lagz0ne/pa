import React, {Component} from 'react';

import {Colors, AppCss, Grid, Row, Col} from 'components/commonComponents';

import Header from './Header';
import LoadStatus from './LoadStatus';

export default({children}) => (
  <div style={{height: '100%', width: '100%', borderTop: `3px solid ${Colors.indigo300}`}}>
    <Grid className={AppCss.fullHeight}>
      {children}
    </Grid>
    <LoadStatus />
  </div>
)
