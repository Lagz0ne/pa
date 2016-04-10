import React, {Component} from 'react';

import {Colors, AppCss, Grid, Row, Col} from 'components/commonComponents';

import Header from './Header';
import LoadStatus from './LoadStatus';

export default({title, child}) => (
  <div className={AppCss.fullHeight} style={{borderTop: `1px solid ${Colors.indigo300}`}}>
    <Header title={title}/>
    <Grid className={AppCss.fullHeight}>
      {child}
    </Grid>
    <LoadStatus />
  </div>
)
