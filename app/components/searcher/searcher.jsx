import React, { Component } from 'react';
import TextField from 'material-ui/lib/text-field';
import Themed from '../../theme';

class Searcher extends Component {
  render() {
    return (
      <TextField
        fullWidth={true}
        hintText={this.props.label}
        floatingLabelText={this.props.label}
        value={this.props.value}
        onChange={this.props.onChange}
        />
    )
  }
}

export default Searcher;
