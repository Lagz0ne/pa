import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import Divider from 'material-ui/lib/divider';
import CardTitle from 'material-ui/lib/card/card-title';
import RaisedButton from 'material-ui/lib/raised-button';

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

  render() {
    return (
      <Row>
        {_.map(this.props.searchResult, result => (
          <Col xs={12} sm={6} key={result.id} style={paddingBottom}>
            <Card>
              <CardTitle title={result.name} subtitle={`${result.birthDate} - ${result.email || 'No email'} - ${result.phone || 'No phone'}`}/>
              <Divider />
              <CardActions>
                <RaisedButton
                  disabled={result.pickedUp}
                  label={`${result.pickedUp ? 'Picked up' : 'Pick up'} | ${result.tShirt} shirt | ${result.registrationNumber}`} primary={true}
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
