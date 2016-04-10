import React, {Component} from 'react';

import {Colors, AppCss, Grid, Row, Col} from 'components/commonComponents';

import Header from './Header';
import LoadStatus from './LoadStatus';

export default({children}) => (
  <div className={AppCss.fullHeight} style={{borderTop: `2px solid ${Colors.indigo300}`}}>
    <Header />
    <Grid className={AppCss.fullHeight}>
      {children}
    </Grid>
    <LoadStatus />
  </div>
)
