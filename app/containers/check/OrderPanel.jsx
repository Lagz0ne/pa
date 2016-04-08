import React, {Component} from 'react';
import {Grid, Row, Col, Colors, Typography, ConfirmableButton, RaisedButton, Divider, SizeLabel} from 'components/commonComponents';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

import * as orderActions from 'actions/orderActions';


class OrderPanel extends Component {

  placeOrder = (ids) => {
    return (e) => {
      this.props.createOrder(this.props.affinity, ids);
    }
  }

  renderOrderButton = (sum, ids) => {
    if (sum > 0) {
      return (
        <ConfirmableButton
          disableAfterAction={false}
          actionLabel='Place order'
          action={this.placeOrder(ids)}
        />
      )
    }
  }

  renderOrderSummary = (group, ids, sum) => {
    return (
      <div style={{width: '100%'}} key={group}>
        <Row>
          <Col xs={12}>
            <RaisedButton
              disabled={true}
              disabledBackgroundColor={Colors.white}
              disabledLabelColor={Colors.grey800}
              fullWidth={true}
              style={{paddingTop: '10px'}}
              labelStyle={{fontWeight: 'bold'}}
              label={this.props.nextOrderId ? `Order ${this.props.nextOrderId}` : "Order"}
              />
          </Col>
        </Row>

        <SizeLabel label="S" amount={group['S']} />
        <SizeLabel label="M" amount={group['M']} />
        <SizeLabel label="L" amount={group['L']} />
        <SizeLabel label="XL" amount={group['XL']} />
        <SizeLabel label="XXL" amount={group['XXL']} />
        <Divider/>
        <SizeLabel label="TOTAL" amount={sum} labelStyle={{fontWeight: 'bold'}}/>
        {this.renderOrderButton(sum, ids)}
      </div>
    )
  }

  render() {

    const registrations = this.props.registrations;

    let sum = 0;
    const orderDetail = {
      'S': 0,
      'M': 0,
      'L': 0,
      'XL': 0,
      'XXL': 0
    };

    const ids = [];
    _.forEach(registrations, (registration) => {
      orderDetail[registration.tShirt] = orderDetail[registration.tShirt] + 1;
      ids.push(registration.id);
      sum += 1;
    });

    return this.renderOrderSummary(orderDetail, ids, sum);
  }
}

export default connect(
  state => ({
    nextOrderId: state.app.order.nextOrderId,
    registrations: state.app.order.registrations,
    affinity: state.app.order.affinity
  }),
  dispatch => bindActionCreators(orderActions, dispatch)
)(OrderPanel);
