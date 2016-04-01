import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardText from 'material-ui/lib/card/card-text';
import Divider from 'material-ui/lib/divider';
import CardTitle from 'material-ui/lib/card/card-title';

/** Buttons **/
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

/** icons **/
import DateIcon from 'material-ui/lib/svg-icons/action/date-range';
import PhoneIcon from 'material-ui/lib/svg-icons/communication/phonelink-ring';;
import MailIcon from 'material-ui/lib/svg-icons/communication/mail-outline';;

/** Colors **/
import Colors from 'material-ui/lib/styles/colors';

import fecha from 'fecha';

import * as eventActions from '../actions/eventActions';

const buttonStyle = {
  margin: 10,
  textAlign: 'center'
};

const noPadding = {
  padding: 0
}

const paddingBottom = {
  paddingBottom: '1rem'
}

class ResultPanel extends Component {

  onPickupClicked = (id) => {
    return (e) => {
      e.preventDefault();
      this.props.pickup(id);
    }
  }

  _convertDate = (date) => {
    const convertedDate = fecha.parse(date, 'YYYY-M-D');
    return fecha.format(convertedDate, 'YYYY-MM-DD');
  }

  render() {
    return (
      <Row>
        {_.map(this.props.searchResult, result => (
          <Col xs={12} sm={6} key={result.id} style={paddingBottom}>
            <Card>
              <CardTitle title={result.name} />

              <CardText>
                <Row top="xs">
                  <Col xs={8}>
                    <RaisedButton
                      disabled={true}
                      label={this._convertDate(result.birthDate)}
                      labelPosition="after"
                      linkButton={true}
                      disabledBackgroundColor={Colors.white}
                      disabledLabelColor={Colors.grey800}
                      icon={<DateIcon />}
                    />
                    <br/>
                    <RaisedButton
                      disabled={true}
                      label={`${result.email || 'N/A'} `}
                      labelStyle={{textTransform: 'lowercase'}}
                      disabledBackgroundColor={Colors.white}
                      disabledLabelColor={Colors.grey800}
                      linkButton={true}
                      icon={<MailIcon />}
                    />
                    <br/>
                    <RaisedButton
                      disabled={true}
                      label={`${result.phone || 'N/A'} `}
                      labelPosition="after"
                      labelStyle={{textTransform: 'lowercase'}}
                      disabledBackgroundColor={Colors.white}
                      disabledLabelColor={Colors.grey800}
                      linkButton={true}
                      icon={<PhoneIcon />}
                    />

                  </Col>
                  <Col xs={4}>
                    <RaisedButton
                      disabled={true}
                      disabledBackgroundColor={Colors.indigo400}
                      disabledLabelColor={Colors.white}
                      fullWidth={true}
                      style={{paddingBottom: '5px'}}
                      label={result.registrationNumber}
                      />

                    <RaisedButton
                      disabled={true}
                      disabledBackgroundColor={Colors.indigo400}
                      disabledLabelColor={Colors.white}
                      fullWidth={true}
                      label={result.tShirt}
                      />
                  </Col>
                </Row>
              </CardText>

              <CardActions>
                <RaisedButton
                  disabled={result.pickedUp}
                  fullWidth={true}
                  disabledBackgroundColor={Colors.grey100}
                  disabledLabelColor={Colors.grey500}
                  label={`${result.pickedUp ? 'Picked up' : 'Pick up'}`} primary={true}
                  onClick={this.onPickupClicked(result.id)}
                  />
              </CardActions>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
}

export default connect(
  state => ({searchResult: state.app.search.searchResult}),
  dispatch => bindActionCreators(eventActions, dispatch)
)(ResultPanel);
