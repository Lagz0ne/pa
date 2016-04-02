import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Row, Col } from 'react-flexbox-grid';

import DatePicker from 'material-ui/lib/date-picker/date-picker';

import TextField from 'material-ui/lib/text-field';

import * as searchActions from '../actions/eventActions';
import * as globalActions from '../actions/globalActions';

class SearchPanel extends Component {
  onSearchKeywordChange = (e) => this.props.persistSearchForm(e.target.value);

  submit = (e) => {
    e.preventDefault();
    this.props.search(this.props.searchKeyword);
  }

  render() {
    return (

      <Row>
        <Col xs={12}>
          <TextField
            fullWidth={true}
            hintText='All da search'
            floatingLabelText='Anything'
            value={this.props.searchKeyword}
            onEnterKeyDown={this.submit}
            onChange={this.onSearchKeywordChange}
            />
        </Col>
      </Row>

    )
  }
}

export default connect(
  state => ({
    searchKeyword: state.app.form['search.keyword'],
  }),
  dispatch => bindActionCreators({ ...globalActions, ...searchActions }, dispatch)
)(SearchPanel);
