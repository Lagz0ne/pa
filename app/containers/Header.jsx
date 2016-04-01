import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

import AppBar from 'material-ui/lib/app-bar';

export default() => (<AppBar title="Pulse Active" showMenuIconButton={false}/>)
