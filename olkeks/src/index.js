import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';

import Routes from './routes';

import $ from 'jquery'
window.$ = window.jQuery = $;
import 'bootstrap'

ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('root')
);
