import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

class MyFlixApplication extends React.Component {
  render() {
    return (
      <div className="my-flix">
        <div>Good morning</div>
      </div>
    );
  }
}
//finds the root of app
const container = document.getElementsByClassName('app-container')[0];

//tells React to render app on the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);

