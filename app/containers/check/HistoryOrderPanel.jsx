import React, {Component} from 'react';
import {Grid, Row, Col, Colors, Typography, ConfirmableButton, RaisedButton, Divider, SizeLabel} from 'components/commonComponents';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

import * as orderActions from 'actions/orderActions';


class HistoryOrderPanel extends Component {

  renderOrderSummary = (group, sum, orderId) => {
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
              label={`Order ${orderId}`}
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
      </div>
    )
  }

  render() {

    const searchResult = this.props.searchResult;
    if (!searchResult || searchResult.length === 0) {
      return false;
    }

    const firstResult = searchResult[0];
    const sameOrder = _.every(searchResult, { orderId: firstResult.orderId });
    if (!sameOrder) {
      return false;
    }

    const orderId = firstResult.orderId;

    let sum = 0;
    const orderDetail = {
      'S': 0,
      'M': 0,
      'L': 0,
      'XL': 0,
      'XXL': 0
    };

    _.forEach(searchResult, (searchResult) => {
      orderDetail[searchResult.tShirt] = orderDetail[searchResult.tShirt] + 1;
      sum += 1;
    });

    return this.renderOrderSummary(orderDetail, sum, orderId);
  }
}

export default connect(
  state => ({
    searchResult: state.app.search.searchResult
  }),
  dispatch => bindActionCreators(orderActions, dispatch)
)(HistoryOrderPanel);
