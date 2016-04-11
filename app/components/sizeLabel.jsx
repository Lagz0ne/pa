import React, {Component} from 'react';
import {Row, Col, RaisedButton, Colors, AppCss} from './commonComponents';

export default ({ label, amount, labelStyle, backgroundColor }) => {

  return (
    <div class={AppCss.fullWidth} style={{backgroundColor: backgroundColor || Colors.white }} >
      <Row>
        <Col xs={4}>
          <RaisedButton
            fullWidth={true}
            disabled={true}
            label={label}
            labelStyle={labelStyle}
            labelPosition="after"
            linkButton={true}
            disabledBackgroundColor={backgroundColor || Colors.white}
            disabledLabelColor={amount === 0 ? Colors.grey400 : Colors.grey800}
          />
        </Col>
        <Col xs={4}>
          <RaisedButton
            fullWidth={true}
            disabled={true}
            label="×"
            labelStyle={labelStyle}
            labelPosition="after"
            linkButton={true}
            disabledBackgroundColor={backgroundColor || Colors.white}
            disabledLabelColor={amount === 0 ? Colors.grey400 : Colors.grey800}
          />
        </Col>
        <Col xs={4}>
          <RaisedButton
            fullWidth={true}
            disabled={true}
            label={amount + ' '}
            labelStyle={labelStyle}
            labelPosition="after"
            linkButton={true}
            disabledBackgroundColor={backgroundColor || Colors.white}
            disabledLabelColor={amount === 0 ? Colors.grey400 : Colors.grey800}
          />
        </Col>
      </Row>
    </div>
  );
}
