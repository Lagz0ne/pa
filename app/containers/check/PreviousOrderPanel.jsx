import React, {Component} from 'react';
import {Grid, Row, Col, Colors, ConfirmableButton, OrderPanel} from 'components/commonComponents';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

import * as orderActions from 'actions/orderActions';

class PreviousOrderPanel extends Component {

  onNewOrderClicked = () => {
    this.props.clearPreviousOrder();
  }

  render() {
    return (
      <Row>
        <Col xs={12}>
          <OrderPanel order={this.props.previousOrder} />
          <ConfirmableButton
            actionLabel="Start next order"
            action={this.onNewOrderClicked}
          />
        </Col>
      </Row>
    )
  }
}

export default connect(
  state => ({
    previousOrder: state.app.order.previousOrder
  }),
  dispatch => bindActionCreators(orderActions, dispatch)
)(PreviousOrderPanel);
