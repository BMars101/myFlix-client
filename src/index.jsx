import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';


import { MainView } from './components/main-view/main-view';

import './index.scss';

class MyFlixApplication extends React.Component {
  render() {
    return (
      <MainView />
    );
  }
}
//finds the root of app
const container = document.getElementsByClassName('app-container')[0];

//tells React to render app on the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);

