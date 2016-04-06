import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

/** Buttons **/
import RaisedButton from 'material-ui/lib/raised-button';

/** Colors **/
import Colors from 'material-ui/lib/styles/colors';
import Typography from 'material-ui/lib/styles/typography';

import Divider from 'material-ui/lib/divider';

import ConfirmableButton from '../components/confirmable';

import * as eventActions from '../actions/eventActions';


class PickupPanel extends Component {

  pickUpAll = (ids) => {
    return (e) => {
      e.preventDefault();
      this.props.pickupAll(ids);
    }
  }

  renderSummary = (accumulatedByOne, accumulatedByMany, idsByGroup) => {
    return (
      <Row>
        <Col xs={12}>
          {this.renderIndividualSummary(accumulatedByOne)}
          {this.renderGroupsSummary(accumulatedByMany, idsByGroup)}
        </Col>
      </Row>
    )
  }

  renderIndividualSummary = (accumulatedByOne) => {
    return false;
  }

  renderGroupsSummary = (accumulatedByMany, idsByGroup) => {
    return _.map(accumulatedByMany, (group, groupName) => this.renderGroupSummary(group, groupName, idsByGroup[groupName]));
  }

  renderSize = (key, amount) => {
    console.log(amount);
    return (
      <Row>
        <Col xs={6}>
          <RaisedButton
            fullWidth={true}
            disabled={true}
            label={key}
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
            labelPosition="after"
            linkButton={true}
            disabledBackgroundColor={Colors.white}
            disabledLabelColor={amount === 0 ? Colors.grey400 : Colors.grey800}
          />
        </Col>
      </Row>
    );
  }

  renderGroupSummary = (group, groupName, ids) => {
    const sum = _.sum(_.values(group));

    return (
      <div style={{width: '100%'}} key={group}>
        <Row>
          <Col xs={12}>
            <RaisedButton
              disabled={true}
              disabledBackgroundColor={Colors.indigo300}
              disabledLabelColor={Colors.white}
              fullWidth={true}
              style={{paddingBottom: '5px'}}
              label={groupName}
              />
          </Col>
        </Row>

        {this.renderSize('S', group['S'] || 0)}
        {this.renderSize('M', group['M'] || 0)}
        {this.renderSize('L', group['L'] || 0)}
        {this.renderSize('XL', group['XL'] || 0)}
        {this.renderSize('XXL', group['XXL'] || 0)}

        <Divider/>
        <Row>
          <Col xs={9}>
            <RaisedButton
              fullWidth={true}
              disabled={true}
              label="Total"
              labelStyle={{fontWeight: 'bold'}}
              labelPosition="after"
              linkButton={true}
              disabledBackgroundColor={Colors.white}
              disabledLabelColor={Colors.grey800}
            />
          </Col>
          <Col xs={3}>
            <RaisedButton
              fullWidth={true}
              disabled={true}
              label={sum}
              labelPosition="after"
              labelStyle={{fontWeight: 'bold'}}
              linkButton={true}
              disabledBackgroundColor={Colors.white}
              disabledLabelColor={Colors.grey800}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <ConfirmableButton
              actionLabel='Pick up all'
              action={this.pickUpAll(ids)}
            />
          </Col>
        </Row>
      </div>
    )
  }

  render() {
    if (_.isEmpty(this.props.searchResult)) {
      return false;
    } else {
      const noPickedUp = _.reject(this.props.searchResult, 'pickedUp');

      const groupedByResult = _.groupBy(noPickedUp, 'registrationNumber');
      const oneOrMany = _.transform(groupedByResult, (result, value, key) => {
        if (value.length === 1) {
          (result['one'] || (result['one'] = [])).push(value[0]);
        } else {
          result[key] = value;
        }
      });

      const accumulatedByOne = _.mapValues(_.groupBy(oneOrMany.one, 'tShirt'), item => item.length);
      const many = _.omit(oneOrMany, 'one');

      const accumulatedByMany = _.mapValues(many, item => {
        return _.mapValues(_.groupBy(item, 'tShirt'), item => item.length);
      });

      const idsByGroup = _.mapValues(groupedByResult, persons => _.map(persons, person => person.id));

      return this.renderSummary(accumulatedByOne, accumulatedByMany, idsByGroup);
    }

  }
}

export default connect(
  state => ({searchResult: state.app.search.searchResult}),
  dispatch => bindActionCreators(eventActions, dispatch)
)(PickupPanel);
