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

class PackScreen extends Component {
  onStartButtonClicked = () => {
    this.props.getNextPackOrder();
  }

  onPackedButtonClicked = () => {
    this.props.packed(this.props.packOrder.orderId);
  }

  onPackedAndTakeNextButtonClicked = () => {
    this.props.packedAndTakeNext(this.props.packOrder.orderId);
  }

  _renderStartButton = () => (
    <Row middle="xs" center="xs" className={AppCss.fullHeight}>
      <Col>
        <RaisedButton
        linkButton={true}
        primary={true}
        label="Start packing"
        onMouseDown={this.onStartButtonClicked} />
      </Col>
    </Row>
  )


  render() {
    if (this.props.packOrder) {
      return (
        <Row center="xs">
          <Col xs={10}>
            <OrderPanel order={this.props.packOrder} />
            <br />

            <ConfirmableButton
              disableAfterAction={false}
              actionLabel="Packed and take next order"
              action={this.onPackedAndTakeNextButtonClicked}
            />
            <br/><br/>
            <ConfirmableButton
              disableAfterAction={false}
              actionBackgroundColor={Colors.indigo500}
              actionLabel="Packed"
              action={this.onPackedButtonClicked}
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
    packOrder: state.app.order.packOrder
  }),
  dispatch => bindActionCreators({...globalActions, ...orderActions}, dispatch)
)(PackScreen);
