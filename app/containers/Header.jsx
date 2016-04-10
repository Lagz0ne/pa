import React, {Component} from 'react';

import {Row, Col, Grid, FlatButton, Colors, RaisedButton, AppCss} from 'components/commonComponents';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as globalActions from 'actions/globalActions';

import AppBar from 'material-ui/lib/app-bar';

class Header extends Component {
  render() {
    if (this.props.isLoggedIn) {
      return this.renderLoggedIn();
    } else {
      return this.renderYetLoggedIn();
    }
  }

  renderLoggedIn = () => {
    return (
      <Row end="sm" center="xs">
        <Col xs={12} sm={6}>
          <RaisedButton disabled={true}
            disabledBackgroundColor={Colors.white}
            disabledLabelColor={Colors.grey700}
            labelStyle={{fontWeight: 'bold'}}
            label={this.props.displayname}/>
          <RaisedButton
            style={{margin: '10px'}}
            primary={true}
            onMouseDown={this.props.logout}
            label={`Log out`}/>
        </Col>
      </Row>
    );
  }

  renderYetLoggedIn = () => false
}

export default connect(
  state => ({
    displayname: state.app.user.displayname,
    isLoggedIn: state.app.user.isLoggedIn
  }),
  dispatch => bindActionCreators(globalActions, dispatch)
)(Header);
