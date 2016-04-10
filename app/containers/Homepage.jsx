import React, {Component} from 'react';

import {RaisedButton, Colors, AppCss, AppStyle, Grid, Row, Col} from 'components/commonComponents';
import { browserHistory } from 'react-router';
import Popover from 'material-ui/lib/popover/popover';

const styles = {
  popover: {
    padding: 20,
  }
};

const navigate = (to) => {
  return () => {
    browserHistory.push(to);
  }
}

const onCheckClicked = () => {

}

export default class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  handleTouchTap = (event) => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  }

  render() {
    return(
      <Row className={AppCss.fullHeight} middle="xs" center="xs">
        <Col xs={12}>
          <RaisedButton label="Check in"
            linkButton={true}
            labelStyle={AppStyle.giantFont}
            style={{height: '60px', width: '180px'}}
            onMouseDown={this.handleTouchTap}
            />

          <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={this.handleRequestClose}
            >
            <div style={styles.popover}>
              <RaisedButton primary={true}
                label="Pos A"
                onMouseDown={navigate('/check/A')}
                />
              <RaisedButton primary={true}
                label="Pos B"
                onMouseDown={navigate('/check/B')}
                />
              <RaisedButton primary={true}
                label="Pos C"
                onMouseDown={navigate('/check/C')}
                />
              <RaisedButton primary={true}
                label="Pos D"
                onMouseDown={navigate('/check/D')}
                />
            </div>
          </Popover>


          <RaisedButton label="Packing"
            linkButton={true}
            labelStyle={AppStyle.giantFont}
            style={{height: '60px', width: '180px'}}
            onMouseDown={navigate('/pack')}
            />

          <RaisedButton label="Check out"
            linkButton={true}
            labelStyle={AppStyle.giantFont}
            style={{height: '60px', width: '180px'}}
            onMouseDown={navigate('/pick')}
            />
        </Col>
      </Row>
    );
  }
}
