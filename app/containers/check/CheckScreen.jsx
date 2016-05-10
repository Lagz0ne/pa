import React, {Component} from 'react';

import {Grid, Row, Col, AppCss} from 'components/commonComponents';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import SearchPanel from './SearchPanel';
import ResultPanel from './ResultPanel';
import OrderPanel from './OrderPanel';
import HistoryOrderPanel from './HistoryOrderPanel';
import PreviousOrderPanel from './PreviousOrderPanel';

class SearchScreen extends Component {
  renderNewOrder = () => (
    <Row>
      <Col xs={12} sm={3} md={2}>
        <SearchPanel />
        <HistoryOrderPanel />
        <OrderPanel />
      </Col>
      <Col xs={12} sm={9} md={10}>
        <ResultPanel/>
      </Col>
    </Row>
  )

  renderPreviousOrder = () => (
    <Row>
      <Col xs={12}>
        <PreviousOrderPanel />
      </Col>
    </Row>
  )

  render() {
    if (this.props.previousOrder) {
      return this.renderPreviousOrder();
    } else {
      return this.renderNewOrder();
    }
  }
}

export default connect(
  state => ({
    previousOrder: state.app.order.previousOrder
  })
)(SearchScreen);
