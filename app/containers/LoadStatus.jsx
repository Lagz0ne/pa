import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as globalActions from 'actions/globalActions';
import Snackbar from 'material-ui/lib/snackbar';

class LoadStatus extends Component {

  onClosing = (reason) => {
    this.props.clearAnnouncement();
  }

  render() {
    return (
      <Snackbar
        bodyStyle={{fontFamily: 'Open Sans', fontSize: '25px'}}
        open={this.props.isLoading}
        message={this.props.loadingText ? this.props.loadingText : `Loading ...`}
        onRequestClose={this.onClosing}
        />
    )
  }
}

export default connect(
  state => ({
    isLoading: state.app.appStatus.isLoading,
    loadingText: state.app.appStatus.announcement
  }),
  dispatch => bindActionCreators(globalActions, dispatch)
)(LoadStatus);
