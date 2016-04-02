import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Snackbar from 'material-ui/lib/snackbar';

class LoadStatus extends Component {

  onClosing = (reason) => {
    return null;
  }

  render() {
    return (
      <Snackbar
        style={{fontFamily: 'Open Sans'}}
        open={this.props.isLoading}
        message="Loading ..."
        onRequestClose={this.onClosing}
        />
    )
  }
}

export default connect(
  state => ({
    isLoading: state.app.appStatus.isLoading
  })
)(LoadStatus);
