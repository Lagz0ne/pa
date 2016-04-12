import React, {Component} from 'react';

import {RaisedButton, Colors, AppCss, AppStyle, Grid, Row, Col} from 'components/commonComponents';
import { browserHistory } from 'react-router';
import * as orderActions from 'actions/orderActions';

import _ from 'lodash';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import imageUrl from './logo.png';

const BigLabel = ({label, color, counter}) => {
  return (
    <div style={{fontWeight: 'bold', fontSize: '155px', color: color || Colors.black}}>
      <div style={{fontSize: '50px', color: Colors.white}}><br/>{counter}<br/></div>
      {label}
    </div>
  );
}

let interval;
class TVScreen extends Component {

  componentWillMount = () => {
    interval = setInterval(this.props.getCheckingOutOrders, 5000);
  }

  componentWillUnMount = () => {
    clearInterval(interval);
  }

  render() {
    const groupByPos = _.groupBy(this.props.tvOrders, 'isPickingBy');

    return(
      <div style={{backgroundColor: Colors.black}}>
        <Grid>
          <Row className={AppCss.fullHeight} middle="xs" center="xs">
            <Col xs={12} className={AppCss.tvMain}>
              <Row className={AppCss.halfHeight}>
                <Col xs={4} className={AppCss.tvNiceBorder}>
                  <BigLabel color={Colors.green500} label={groupByPos['Counter 1'] ? groupByPos['Counter 1'][0].orderId : ''} counter="Counter 1"/>
                </Col>
                <Col xs={4} className={AppCss.tvNiceBorder}>
                  <BigLabel color={Colors.green100} label={groupByPos['Counter 2'] ? groupByPos['Counter 2'][0].orderId : ''} counter="Counter 2"/>
                </Col>
                <Col xs={4} className={AppCss.tvNiceBorder}>
                  <BigLabel color={Colors.pink500} label={groupByPos['Counter 3'] ? groupByPos['Counter 3'][0].orderId : ''} counter="Counter 3"/>
                </Col>
              </Row>
              <Row className={AppCss.halfHeight} middle="xs" center="xs">
                <Col xs={4} className={AppCss.tvNiceBorder}>
                  <BigLabel color={Colors.pink500} label={groupByPos['Counter 4'] ? groupByPos['Counter 4'][0].orderId : ''} counter="Counter 4"/>
                </Col>
                <Col xs={4} className={AppCss.tvNiceBorder}>
                  <BigLabel color={Colors.blue500} label={groupByPos['Counter 5'] ? groupByPos['Counter 5'][0].orderId : ''} counter="Counter 5"/>
                </Col>
                <Col xs={4} className={AppCss.tvNiceBorder}>
                  <BigLabel color={Colors.grey500} label={groupByPos['Counter 6'] ? groupByPos['Counter 6'][0].orderId : ''} counter="Counter 6"/>
                </Col>
              </Row>
            </Col>
            <Col xs={12} className={AppCss.tvFooter}>
              <Row middle="xs" center="xs">
                <Col xs={6}>
                  <img src={imageUrl} style={{width: '100px'}}/>
                </Col>
                <Col xs={6}>
                  <span style={{fontWeight: 'bold', fontSize: '30px', color: Colors.pink300}}>
                    #BE
                  </span>
                  <span style={{fontWeight: 'bold', fontSize: '30px', color: Colors.yellow500}}>
                    EVERY
                  </span>
                  <span style={{fontWeight: 'bold', fontSize: '30px', color: Colors.lightGreen300}}>
                    THING
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default connect(
  state => ({
    tvOrders: state.app.order.tvOrders
  }),
  dispatch => bindActionCreators(orderActions, dispatch)
)(TVScreen);
