import React from 'react';
import ReactDOM from 'react-dom';
import {browserHistory} from 'react-router';

import Routes from './routes';

import 'jquery'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import './index.css'

ReactDOM.render(
  <Routes history={browserHistory} />,
  document.getElementById('root')
);
