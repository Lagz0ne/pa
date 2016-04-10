import React, {Component} from 'react';
import {Grid, Row, Col, Colors, Typography, ConfirmableButton, RaisedButton, Divider, SizeLabel} from 'components/commonComponents';

import _ from 'lodash';

export default ({ order, orderLabelStyle }) => {
  const sum = order['S']
    + order['M']
    + order['L']
    + order['XL']
    + order['XXL'];

  const _orderLabelStyle = Object.assign({}, {
    fontWeight: 'bold',
    fontSize: '60px',
    color: Colors.green500
  }, orderLabelStyle);

  return (
    <Row>
      <Col xs={12}>
        <span>ORDER</span>
        <RaisedButton
          disabled={true}
          disabledBackgroundColor={Colors.white}
          disabledLabelColor={Colors.grey800}
          fullWidth={true}
          style={{paddingTop: '10px', height: '60px', marginBottom: '30px'}}
          labelStyle={_orderLabelStyle}
          label={order.orderId}
          />
      </Col>
      <Col xs={12}>
        <SizeLabel label="S" amount={order['S']} labelStyle={{fontSize: '20px'}}/>
        <SizeLabel label="M" amount={order['M']} labelStyle={{fontSize: '20px'}}/>
        <SizeLabel label="L" amount={order['L']} labelStyle={{fontSize: '20px'}}/>
        <SizeLabel label="XL" amount={order['XL']} labelStyle={{fontSize: '20px'}}/>
        <SizeLabel label="XXL" amount={order['XXL']} labelStyle={{fontSize: '20px'}}/>
        <Divider/>
        <SizeLabel label="TOTAL" amount={sum} labelStyle={{fontWeight: 'bold'}}/>
      </Col>
    </Row>
  );
}
