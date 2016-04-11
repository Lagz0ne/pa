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
    color: Colors.green800
  }, orderLabelStyle);

  const labelStyle = {fontSize: '24px', fontWeight: 'bold'};

  return (
    <Row middle="xs" center="xs">
      <Col xs={12}>
        <span>ORDER</span>
        <RaisedButton
          disabled={true}
          disabledBackgroundColor={Colors.white}
          disabledLabelColor={Colors.grey800}
          fullWidth={true}
          style={{paddingTop: '10px', height: '70px', marginBottom: '30px'}}
          labelStyle={_orderLabelStyle}
          label={order.orderId}
          />
      </Col>
      <Col xs={10}>
        <SizeLabel label="S" amount={order['S']} labelStyle={labelStyle} backgroundColor={Colors.grey200}/>
        <SizeLabel label="M" amount={order['M']} labelStyle={labelStyle}/>
        <SizeLabel label="L" amount={order['L']} labelStyle={labelStyle} backgroundColor={Colors.grey200}/>
        <SizeLabel label="XL" amount={order['XL']} labelStyle={labelStyle}/>
        <SizeLabel label="XXL" amount={order['XXL']} labelStyle={labelStyle} backgroundColor={Colors.grey200}/>
        <Divider/>
        <SizeLabel label="TOTAL" amount={sum} labelStyle={labelStyle}/>
      </Col>
    </Row>
  );
}
