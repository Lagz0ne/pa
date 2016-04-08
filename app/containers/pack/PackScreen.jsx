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
        <Row middle="xs" center="xs" className={AppCss.fullHeight}>
          <Col xs={8}>
            <OrderPanel order={this.props.packOrder} />
            <br />

            <RaisedButton
              linkButton={true}
              primary={true}
              fullWidth={true}
              label="Packed and take next order"
              onMouseDown={this.onPackedAndTakeNextButtonClicked}
            />
            <br/><br/>
            <RaisedButton
              linkButton={true}
              primary={true}
              fullWidth={true}
              backgroundColor={Colors.indigo500}
              label="Packed"
              onMouseDown={this.onPackedButtonClicked}
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
