import React, {Component} from 'react';

import {RaisedButton, Colors, AppCss, AppStyle, Grid, Row, Col} from 'components/commonComponents';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';

import * as globalActions from 'actions/globalActions';

import Paper from 'material-ui/lib/paper';
import TextField from 'material-ui/lib/text-field';

const style = {
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  onFieldChange = (type) => {
    return (e) => {
      this.setState({[type]: e.target.value});
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {username, password} = this.state;
    this.props.login(username, password);
  }

  render() {
    return(
      <Row className={AppCss.fullHeight} middle="xs" center="xs">
        <Col lg={4} md={6} sm={8} xs={10}>
          <TextField
            fullWidth={true}
            hintText="Enter username"
            floatingLabelText="Username"
            value={this.state.username}
            onChange={this.onFieldChange("username")}
            onEnterKeyDown={this.onSubmit}
          />
          <TextField
            fullWidth={true}
            hintText="Enter password"
            type="password"
            floatingLabelText="Password"
            value={this.state.password}
            onChange={this.onFieldChange("password")}
            onEnterKeyDown={this.onSubmit}
          />
          <RaisedButton
            fullWidth={true}
            primary={true}
            label="Login"
            onMouseDown={this.onSubmit}
          />
        </Col>
      </Row>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => bindActionCreators(globalActions, dispatch)
)(LoginScreen);
