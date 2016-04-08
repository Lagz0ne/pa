import React, {Component} from 'react';
import {
  RaisedButton, Row, Col,
  AppCss, AppStyle, Colors,
  Divider,
  SizeLabel,
  OrderPanel
} from 'components/commonComponents';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

import * as globalActions from 'actions/globalActions';
import * as orderActions from 'actions/orderActions';

class PickScreen extends Component {
  onStartButtonClicked = () => {
    this.props.getNextPickOrder();
  }

  onPickedButtonClicked = () => {
    this.props.picked(this.props.pickOrder.orderId);
  }

  onPickedAndTakeNextButtonClicked = () => {
    this.props.pickedAndTakeNext(this.props.pickOrder.orderId);
  }

  _renderStartButton = () => (
    <Row middle="xs" center="xs" className={AppCss.fullHeight}>
      <Col>
        <RaisedButton
        linkButton={true}
        primary={true}
        label="Start picking"
        onMouseDown={this.onStartButtonClicked} />
      </Col>
    </Row>
  )


  render() {
    if (this.props.pickOrder) {
      return (
        <Row middle="xs" center="xs" className={AppCss.fullHeight}>
          <Col xs={8}>
            <OrderPanel order={this.props.pickOrder} />
            <br />

            <RaisedButton
              linkButton={true}
              primary={true}
              fullWidth={true}
              label="Picked and take next order"
              onMouseDown={this.onPickedAndTakeNextButtonClicked}
            />
            <br/><br/>
            <RaisedButton
              linkButton={true}
              primary={true}
              fullWidth={true}
              backgroundColor={Colors.indigo500}
              label="Picked"
              onMouseDown={this.onPickedButtonClicked}
            />
          </Col>
        </Row>
      );
    } else {
      return this._renderStartButton();
    }
  }

}

export default connect(
  state => ({
    // isPacking: state.app.appStatus.isPacking,
    pickOrder: state.app.order.pickOrder
  }),
  dispatch => bindActionCreators({...globalActions, ...orderActions}, dispatch)
)(PickScreen);
