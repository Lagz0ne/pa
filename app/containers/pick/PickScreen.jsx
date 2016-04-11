import React, {Component} from 'react';
import {
  RaisedButton, Row, Col,
  AppCss, AppStyle, Colors,
  Divider,
  SizeLabel,
  OrderPanel,
  ConfirmableButton
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
        label="Start checking out"
        onMouseDown={this.onStartButtonClicked} />
      </Col>
    </Row>
  )


  render() {
    if (this.props.pickOrder) {
      return (
        <Row center="xs">
          <Col xs={10}>
            <OrderPanel order={this.props.pickOrder} />
            <br />
          </Col>
          <Col xs={6}>
            <ConfirmableButton
              buttonStyle={{height: '80px'}}
              disableAfterAction={false}
              actionLabel="Picked and take next order"
              action={this.onPickedAndTakeNextButtonClicked}
            />
          </Col>
          <Col xs={6}>
            <ConfirmableButton
              buttonStyle={{height: '80px'}}
              disableAfterAction={false}
              actionBackgroundColor={Colors.indigo500}
              actionLabel="Picked"
              action={this.onPickedButtonClicked}
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
