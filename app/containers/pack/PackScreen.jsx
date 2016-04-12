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
  constructor(props) {
    super(props);
    this.state = {
      previousOrders: []
    }
  }

  onStartButtonClicked = () => {
    this.props.getNextPackOrder();
  }

  onPackedButtonClicked = () => {
    this.props.packed(this.props.packOrder.orderId);
  }

  onPackedAndTakeNextButtonClicked = () => {
    this.props.packedAndTakeNext(this.props.packOrder.orderId);

    const previousOrders = this.state.previousOrders;
    previousOrders.unshift(this.props.packOrder);
    if (previousOrders.length > 5) {
      previousOrders.pop();
    }

    this.setState({previousOrders: previousOrders});
  }

  _renderStartButton = () => (
    <Row middle="xs" center="xs" className={AppCss.fullHeight}>
      <Col>
        <RaisedButton
          labelStyle={{fontWeight: 'bold', fontSize: '25px'}}
          style={{height: '80px'}}
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
          <Col xs={2}>
            PREVIOUS ORDER
            {_.map(this.state.previousOrders, order => (
              <div style={{fontSize: '25px', fontWeight: 'bold', color: Colors.indigo500}}>
                {order.orderId}
              </div>
            ))}
          </Col>
          <Col xs={10}>
            <OrderPanel order={this.props.packOrder} />
            <br />
          </Col>
          <Col xs={12} md={6}>
            <ConfirmableButton
              buttonStyle={{height: '80px'}}
              labelStyle={{fontWeight: 'bold', fontSize: '30px'}}
              disableAfterAction={false}
              actionLabel="Pack and take next order"
              action={this.onPackedAndTakeNextButtonClicked}
            />
          </Col>
          <Col xs={12} md={6}>
            <ConfirmableButton
              buttonStyle={{height: '80px'}}
              labelStyle={{fontWeight: 'bold', fontSize: '30px'}}
              disableAfterAction={false}
              actionBackgroundColor={Colors.indigo500}
              actionLabel="Stop"
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
