import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';

import SearchPanel from './SearchPanel';
import ResultPanel from './ResultPanel';
import Header from './Header';
import PickupPanel from './PickupPanel';

const noPaddingStyle = {
  'marginLeft': '0.2rem',
  'marginRight': '0.2rem'
}

export default() => (
  <div>
    <Header/>
    <Grid>
      <Row style={noPaddingStyle}>
        <Col xs={12} sm={3} md={2}>
          <SearchPanel />
          <PickupPanel />
        </Col>

        <Col xs={12} sm={9} md={10}>
          <br/>
          <ResultPanel/>
        </Col>
      </Row>
    </Grid>
  </div>
)
