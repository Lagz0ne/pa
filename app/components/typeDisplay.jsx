import React, {Component} from 'react';
import {Row, Col, RaisedButton, Colors, AppCss} from './commonComponents';


// : result.type === 'Normal' ? Colors.amber500
//   : result.type === 'Lavie' ? Colors.blue800
//     : result.type === 'S-Kit' ? Colors.pink800 : Colors.indigo300
export default ({ type }) => (
  <Row center="xs">
    <Col xs={3}>
      <RaisedButton
        fullWidth={true}
        disabledBackgroundColor={Colors.white}
        disabled={type !== 'S-Kit'}
        labelColor={Colors.white}
        backgroundColor={Colors.pink800}
        label="S-Kit" />
    </Col>
    <Col xs={3}>
      <RaisedButton
        fullWidth={true}
        disabledBackgroundColor={Colors.white}
        disabled={type !== 'Lavie'}
        labelColor={Colors.white}
        backgroundColor={Colors.blue800}
        label="Lavie" />
    </Col>
    <Col xs={3}>
      <RaisedButton
        fullWidth={true}
        disabledBackgroundColor={Colors.white}
        disabled={type !== 'Normal'}
        labelColor={Colors.white}
        backgroundColor={Colors.amber500}
        label="Normal" />
    </Col>
  </Row>
)
