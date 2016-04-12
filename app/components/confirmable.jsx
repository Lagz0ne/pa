import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';

/** Colors **/
import Colors from 'material-ui/lib/styles/colors';

/** Buttons **/
import RaisedButton from 'material-ui/lib/raised-button';

const defaultProps = {
  disabled: false,
  disabledLabel: '',
  disableAfterAction: true,
  actionLabel: '',
  action: () => {},
  yesLabel: 'Ready',
  noLabel: 'No',
  actionBackgroundColor: '',
  buttonStyle: {},
  labelStyle: {}
}

export default class Confirmable extends Component {

  constructor(props) {
    super(props);
    this.state = {confirming: false, confirmed: false};
  }

  _onConfirm = (e) => {
    e.preventDefault();
    this.setState({ confirming: true });
  }

  _onYes = (e) => {
    e.preventDefault();
    this.setState({ confirming: false, confirmed: true });
    this.props.action(e);
  }

  _onNo = (e) => {
    e.preventDefault();
    this.setState({ confirming: false });
  }

  _renderIntialButton = (options) => (
    <Row>
      <Col xs={12}>
        <RaisedButton
          style={options.buttonStyle}
          disabled={options.disabled || (options.disableAfterAction && this.state.confirmed)}
          fullWidth={true}
          label={options.disabled ? options.disabledLabel : options.actionLabel}
          labelStyle={options.labelStyle}
          disabledBackgroundColor={Colors.grey100}
          disabledLabelColor={Colors.grey500}
          primary={true}
          onMouseDown={this._onConfirm}
          backgroundColor={options.actionBackgroundColor}
          />
      </Col>
    </Row>
  )

  _renderYesNoButtons = (options) => (
    <Row>
      <Col xs={6}>
        <RaisedButton
          style={options.buttonStyle}
          backgroundColor={Colors.lightGreen600}
          labelColor={Colors.white}
          fullWidth={true}
          label={options.yesLabel}
          labelStyle={options.labelStyle}
          primary={true}
          onMouseDown={this._onYes}
          />
      </Col>
      <Col xs={6}>
        <RaisedButton
          style={options.buttonStyle}
          backgroundColor={Colors.red500}
          labelColor={Colors.white}
          fullWidth={true}
          label={options.noLabel}
          labelStyle={options.labelStyle}
          primary={true}
          onMouseDown={this._onNo}
          />
      </Col>
    </Row>
  )

  render() {
    const options = Object.assign({}, defaultProps, this.props);
    if (this.state.confirming) {
      return this._renderYesNoButtons(options);
    } else {
      return this._renderIntialButton(options);
    }
  }

}
