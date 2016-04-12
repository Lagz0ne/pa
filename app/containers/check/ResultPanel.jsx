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
import ConfirmableButton from 'components/confirmable';

/** icons **/
import DateIcon from 'material-ui/lib/svg-icons/action/date-range';
import PhoneIcon from 'material-ui/lib/svg-icons/communication/phonelink-ring';;
import MailIcon from 'material-ui/lib/svg-icons/communication/mail-outline';;

/** Colors **/
import Colors from 'material-ui/lib/styles/colors';

import fecha from 'fecha';

import * as eventActions from '../../actions/eventActions';
import * as globalActions from '../../actions/globalActions';
import * as orderActions from 'actions/orderActions';

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

  onAddToOrderClicked = (registration) => {
    return (e) => {
      e.preventDefault();
      this.props.addToOrder(registration);
    }
  }

  onRemoveFromOrderClicked = (registration) => {
    return (e) => {
      e.preventDefault();
      this.props.removeFromOrder(registration);
    }
  }

  onRegistrationClicked = (keyword) => {
    return (e) => {
      e.preventDefault();
      this.props.persistSearchForm(keyword);
      this.props.search(keyword);
    }
  }

  _convertDate = (date) => {
    const convertedDate = fecha.parse(date, 'YYYY-M-D');
    return fecha.format(convertedDate, 'DD/MM/YYYY');
  }

  _renderGroupButton = (result) => {
    if (result.isInGroup) {
      return (
        <FlatButton
          fullWidth={true}
          style={{width: '100%', marginTop: '5px'}}
          labelStyle={{color: Colors.white}}
          label="Group"
          fullWidth={true}
          backgroundColor={Colors.indigo300}
          hoverColor={Colors.indigo100}
          onMouseDown={this.onRegistrationClicked(result.registrationNumber)} />
      );
    } else {
      return false;
    }
  }

  onAddAllToOrderClicked = () => {
    const filteredArray = _.filter(this.props.searchResult, result => !!!result.orderId);
    console.log(filteredArray);
    this.props.addToOrder(filteredArray);
  }

  renderAddAllToOrderButton = () => {
    if (this.props.searchResult && this.props.searchResult.length > 0) {
      const inGroup = this.props.searchResult[0].isInGroup;
      const groupNumber = this.props.searchResult[0].registrationNumber;
      const shouldRender = _.every(this.props.searchResult, {isInGroup: true, registrationNumber: groupNumber});

      if (shouldRender) {
        return (
          <Col xs={12}>
            <RaisedButton
              style={{marginTop: '15px', marginBottom: '15px'}}
              primary={true}
              onMouseDown={this.onAddAllToOrderClicked}
              label="Add all to order"
              />
          </Col>
        );
      } else {
        return false;
      }

    }
    return false;
  }

  _renderStatus = (orderId, isDone, doneLabel, isDoing, doingLabel, byWhom, when) => {
    if (isDone) {
      const formattedDate = fecha.format(when, 'dd/MM/YYYY hh:mm');
      return (
        <RaisedButton
          disabled={true}
          fullWidth={true}
          disabledBackgroundColor={Colors.grey100}
          disabledLabelColor={Colors.grey900}
          label={`${orderId} - ${byWhom} - ${formattedDate}`}
        />
      );
    } else if (isDoing) {
      return (
        <RaisedButton
          disabled={true}
          fullWidth={true}
          disabledBackgroundColor={Colors.grey100}
          disabledLabelColor={Colors.grey900}
          label={`${orderId} is ${doingLabel} by ${byWhom}`}
        />
      );
    }
    return false;
  }

  _renderActionButton = (result, groupedById, shouldDisableAddButton) => {
    const inGroup = this.props.searchResult[0].isInGroup;
    const groupNumber = this.props.searchResult[0].registrationNumber;
    const shouldRender = _.every(this.props.searchResult, {isInGroup: true, registrationNumber: groupNumber});

    if (result.order) { // Already in another order
      return (
        <span>
          {this._renderStatus(result.orderId,
              result.order.checked, 'checked in',
              false, '',
              result.order.checkedBy, result.order.checkedAt
            )}
          {this._renderStatus(result.orderId,
              result.order.packed, 'packed',
              result.order.isPackingBy, 'packing',
              result.order.isPackingBy, result.order.checkedAt
          )}
          {this._renderStatus(result.orderId,
              result.order.picked, 'checked out',
              result.order.isPickingBy, 'checking out',
              result.order.isPickingBy, result.order.checkedAt
          )}
        </span>
      )
    } else if (!!groupedById[result.id]) { // Is added
      return (
        <RaisedButton
          fullWidth={true}
          backgroundColor={Colors.lightGreen500}
          labelColor={Colors.white}
          label="Remove from order"
          onMouseDown={this.onRemoveFromOrderClicked(result)}
        />
      );
    } else {
      console.log("Rerendering");
      return (
        <RaisedButton
          disabled={shouldDisableAddButton || shouldRender}
          fullWidth={true}
          primary={true}
          labelColor={Colors.white}
          label="Add to order"
          onMouseDown={this.onAddToOrderClicked(result, groupedById)}
        />
      );
    }

  }

  render() {
    const addedToOrder = _.intersectionBy(this.props.searchResult, this.props.addedToOrder, 'id');
    const groupedById = _.groupBy(addedToOrder, 'id');

    const shouldDisableAddButton = this.props.addedToOrder.length >= 5;
    return (
      <Row>
        {this.renderAddAllToOrderButton()}
        {_.map(this.props.searchResult, result => (
          <Col xs={12} sm={6} md={4} key={result.id} style={paddingBottom}>
            <Card>
              <CardTitle title={result.name} subtitle={result.email === '' ? 'no email provided' : result.email}/>

              <CardText>
                <Row top="xs">
                  <Col xs={7}>
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
                      label={result.phone === '' ? 'N/A' : result.phone}
                      disabledLabel={result.phone === '' ? 'N/A' : result.phone}
                      labelPosition="after"
                      labelStyle={{textTransform: 'lowercase'}}
                      disabledBackgroundColor={Colors.white}
                      disabledLabelColor={Colors.grey800}
                      linkButton={true}
                      icon={<PhoneIcon />}
                    />

                  </Col>
                  <Col xs={5}>
                    <RaisedButton
                      disabled={true}
                      disabledBackgroundColor={result.pickedUp ? Colors.grey100 : Colors.indigo300}
                      disabledLabelColor={result.pickedUp ? Colors.grey500 : Colors.white}
                      fullWidth={true}
                      label={result.registrationNumber}
                      style={{marginTop: '5px'}}
                      />

                    <RaisedButton
                      disabled={true}
                      disabledBackgroundColor={result.pickedUp ? Colors.grey100 : Colors.indigo300}
                      disabledLabelColor={result.pickedUp ? Colors.grey500 : Colors.white}
                      fullWidth={true}
                      label={result.tShirt}
                      style={{marginTop: '5px'}}
                      />

                    {this._renderGroupButton(result)}
                  </Col>
                </Row>
              </CardText>

              <CardActions>
                {this._renderActionButton(result, groupedById, shouldDisableAddButton)}
              </CardActions>
            </Card>
          </Col>
        ))}
      </Row>
    );
  }
}

export default connect(
  state => ({
    addedToOrder: state.app.order.registrations,
    searchResult: state.app.search.searchResult
  }),
  dispatch => bindActionCreators({ ...globalActions, ...eventActions, ...orderActions }, dispatch)
)(ResultPanel);
