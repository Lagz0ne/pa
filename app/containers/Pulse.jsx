import React, {Component} from 'react';

import {Colors, AppCss, Grid, Row, Col} from 'components/commonComponents';

import Header from './Header';
import LoadStatus from './LoadStatus';

export default({title, child}) => (
  <div className={AppCss.fullHeight} style={{borderTop: `1px solid ${Colors.indigo300}`}}>
    {title ? <Header title={title}/> : <span></span>}
    <Grid className={AppCss.fullHeight} fluid>
      {child}
    </Grid>
    <LoadStatus />
  </div>
)
