import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

/** Buttons **/
import RaisedButton from 'material-ui/lib/raised-button';

/** Colors **/
import Colors from 'material-ui/lib/styles/colors';

import Divider from 'material-ui/lib/divider';

import * as eventActions from '../actions/eventActions';

const noPaddingStyle = {
  'marginLeft': '0.2rem',
  'marginRight': '0.2rem'
}


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
        {this.renderIndividualSummary(accumulatedByOne)}
        {this.renderGroupsSummary(accumulatedByMany, idsByGroup)}
      </Row>
    )
  }

  renderIndividualSummary = (accumulatedByOne) => {
    return false;
  }

  renderGroupsSummary = (accumulatedByMany, idsByGroup) => {
    return _.map(accumulatedByMany, (group, groupName) => this.renderGroupSummary(group, groupName, idsByGroup[groupName]));
  }

  renderGroupSummary = (group, groupName, ids) => {
    const sortedKeys = _.keys(group).sort();
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
        {_.map(sortedKeys, key => (
          <Row key={key}>
            <Col xs={6}>
              <RaisedButton
                fullWidth={true}
                disabled={true}
                label={key}
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
                label="×"
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
                label={group[key]}
                labelPosition="after"
                linkButton={true}
                disabledBackgroundColor={Colors.white}
                disabledLabelColor={Colors.grey800}
              />
            </Col>
          </Row>
        ))}
        <Divider/>
        <Row>
          <Col xs={9}/>
          <Col xs={3}>
            <RaisedButton
              fullWidth={true}
              disabled={true}
              label={sum}
              labelPosition="after"
              linkButton={true}
              disabledBackgroundColor={Colors.white}
              disabledLabelColor={Colors.grey800}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <RaisedButton
              fullWidth={true}
              label={`Pick up all`}
              primary={true}
              onMouseDown={this.pickUpAll(ids)}
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
