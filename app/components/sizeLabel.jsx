import React, {Component} from 'react';
import {Row, Col, RaisedButton, Colors} from './commonComponents';

export default ({ label, amount, labelStyle }) => {
  
  return (
    <Row>
      <Col xs={6}>
        <RaisedButton
          fullWidth={true}
          disabled={true}
          label={label}
          labelStyle={labelStyle}
          labelPosition="after"
          linkButton={true}
          disabledBackgroundColor={Colors.white}
          disabledLabelColor={amount === 0 ? Colors.grey400 : Colors.grey800}
        />
      </Col>
      <Col xs={3}>
        <RaisedButton
          fullWidth={true}
          disabled={true}
          label="×"
          labelStyle={labelStyle}
          labelPosition="after"
          linkButton={true}
          disabledBackgroundColor={Colors.white}
          disabledLabelColor={amount === 0 ? Colors.grey400 : Colors.grey800}
        />
      </Col>
      <Col xs={3}>
        <RaisedButton
          fullWidth={true}
          disabled={true}
          label={amount + ' '}
          labelStyle={labelStyle}
          labelPosition="after"
          linkButton={true}
          disabledBackgroundColor={Colors.white}
          disabledLabelColor={amount === 0 ? Colors.grey400 : Colors.grey800}
        />
      </Col>
    </Row>
  );
}
