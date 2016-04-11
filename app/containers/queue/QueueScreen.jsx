import React, {Component} from 'react';

import {RaisedButton, ConfirmableButton, FlatButton, Colors, AppCss, AppStyle, Grid, Row, Col, SizeLabel, Divider} from 'components/commonComponents';

import { browserHistory } from 'react-router';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

import * as orderActions from 'actions/orderActions';
import * as adminActions from 'actions/adminActions';

import fecha from 'fecha';

import Paper from 'material-ui/lib/paper';

let timeoutFunction = undefined;

class QueueScreen extends Component {

  _onResetButtonClicked = (type, orderId) => {
    return (e) => {
      e.preventDefault();
      this.props.reset(type, orderId);
    }
  }

  _onPackButtonClicked = (orderId) => {
    return (e) => {
      e.preventDefault();
      this.props.packed(orderId);
    }
  }

  _onPickButtonClicked = (orderId) => {
    return (e) => {
      e.preventDefault();
      this.props.picked(orderId);
    }
  }

  componentWillMount = () => {
    timeoutFunction = setInterval(() => {
      this.props.getOrders();
    }, 10 * 1000);
    this.props.getOrders();
  }

  componentWillUnmount = () => {
    clearInterval(timeoutFunction);
  }

  formatDate = (date) => {
    return fecha.format(date, 'HH:mm');
  }

  _renderCheckin = (order) => {
    if (order.checked) {
      return (
        <div style={{color: Colors.green500}}>Order checked in by {order.checkedBy} at {this.formatDate(order.checkedAt)}</div>
      )
    } else {
      return (
        <div style={{color: Colors.grey300}}>Order is yet checked in</div>
      )
    }
  }

  _renderPacking = (order) => {
    if (order.packed) {
      return (
        <div style={{color: Colors.green500}}>Order is packed by {order.packedBy} at {this.formatDate(order.packedAt)}</div>
      )
    } else if (order.isPackingBy) {
      return (
        <div style={{color: Colors.pink500}}>Order is packing by {order.isPackingBy}</div>
      )
    } else {
      return (
        <div style={{color: Colors.grey300}}>Order is not yet packed</div>
      )
    }
  }

  _renderCheckout = (order) => {
    if(order.picked) {
      return (
        <div style={{color: Colors.green500}}>Order is checked out by {order.pickedBy} at {this.formatDate(order.pickedAt)}</div>
      )
    } else if(order.isPickingBy) {
      return (
        <div style={{color: Colors.pink500}}>Order is checking out by {order.isPickingBy}</div>
      )
    } else {
      return (
        <div style={{color: Colors.grey300}}>Order is not yet checked out</div>
      )
    }
  }

  _renderOrderCard = (order) => {
    return (
      <Row key={order.orderId}>
        <Col xs={12}>
          <Paper style={{padding: '10px', marginBottom: '10px'}} zDepth={1}>
            <Row>
              <Col xs={2} md={1}>
                <div style={{fontSize: '40px', color: Colors.lightGreen500, fontWeight: 'bold', textAlign: 'center'}}>
                  <br/><br/>
                  {order.orderId}
                </div>
              </Col>
              <Col xs={10} md={4}>
                <SizeLabel label="S" amount={order['S']} />
                <SizeLabel label="M" amount={order['M']} />
                <SizeLabel label="L" amount={order['L']} />
                <SizeLabel label="XL" amount={order['XL']} />
                <SizeLabel label="XXL" amount={order['XXL']} />
                <Divider />
                <SizeLabel label="TOTAL" amount={order['S'] + order['M'] + order['L'] + order['XL'] + order['XXL']} />
              </Col>
              <Col xs={12} md={7}>
                <Row className={AppCss.halfHeight} top="md" bottom="xs" left="xs">
                  <Col xs={12}>
                    <div style={{textAlign: 'left', height: '205px', fontSize: '15px', textTransform: 'uppercase', fontWeight: 'bold'}}>
                      {this._renderCheckin(order)}
                      <br/>
                      {this._renderPacking(order)}
                      <br/>
                      {this._renderCheckout(order)}
                    </div>
                  </Col>
                </Row>
                <br/>
                <Row middle="md" top="xs">
                  <Col md={4} xs={12}>
                    <ConfirmableButton
                      disabled={!(order.checked && order.packed && !order.picked)}
                      action={this._onPickButtonClicked(order.orderId)}
                      disabledLabel="Checked out"
                      actionLabel="Check out"/>
                  </Col>
                  <Col md={4} xs={12}>
                    <ConfirmableButton
                      disabled={!(order.checked && !order.packed && !order.picked)}
                      action={this._onPackButtonClicked(order.orderId)}
                      disabledLabel="Packed"
                      actionBackgroundColor={Colors.indigo500}
                      actionLabel="Pack"/>
                  </Col>
                </Row>
                <br/>
                <Row bottom="md" top="xs">
                  <Col md={4} xs={12}>
                    <ConfirmableButton
                      action={this._onResetButtonClicked('checkout', order.orderId)}
                      disabled={!(order.picked || order.isPickingBy)}
                      disabledLabel="Reset check out"
                      actionLabel="Reset check out"/>
                  </Col>
                  <Col md={4} xs={12}>
                    <ConfirmableButton
                      action={this._onResetButtonClicked('packing', order.orderId)}
                      disabled={!(order.packed || order.isPackingBy)}
                      disabledLabel="Reset packing"
                      actionBackgroundColor={Colors.indigo500}
                      actionLabel="Reset packing"/>
                  </Col>
                  <Col md={4} xs={12}>
                    <ConfirmableButton
                      action={this._onResetButtonClicked('checkin', order.orderId)}
                      actionBackgroundColor={Colors.green500}
                      actionLabel="Reset check in"/>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Paper>
        </Col>
      </Row>
    )
  }

  render() {
    return(
      <span>
        { _.map(this.props.adminOrders, (order) => this._renderOrderCard(order)) }
      </span>
    );
  }
}

export default connect(
  state => ({
    adminOrders: state.app.order.adminOrders
  }),
  dispatch => bindActionCreators({...adminActions, ...orderActions}, dispatch)
)(QueueScreen);
